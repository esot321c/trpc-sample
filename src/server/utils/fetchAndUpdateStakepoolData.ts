import { prisma } from '@server/prisma';
import { TRPCError } from '@trpc/server';
import { blockfrostAPI } from './blockfrostApi';

export const fetchAndUpdateStakepoolData = async (stakepoolIds: string[]) => {
  // Variables to store successful and unsuccessful stakepools
  const successfulStakePools = [];
  const errors = [];

  const normalizedPoolIds = [];
  let stakePools;
  try {
    stakePools = await prisma.stakepool.findMany({
      where: {
        OR: [
          { hex: { in: stakepoolIds } },
          { pool_id: { in: stakepoolIds } },
        ],
      },
      select: {
        pool_id: true,
        hex: true,
      },
    });
  } catch (error) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Error retrieving stakepools from the database.',
    });
  }

  for (const identifier of stakepoolIds) {
    try {
      const existingPool = stakePools.find(pool => pool.pool_id === identifier || pool.hex === identifier);
      if (existingPool) {
        normalizedPoolIds.push(existingPool.pool_id);
      } else {
        const { data: metadata } = await blockfrostAPI.get(`/pools/${identifier}/metadata`);
        normalizedPoolIds.push(metadata.pool_id);

        await prisma.stakepool.create({
          data: {
            pool_id: metadata.pool_id,
            ...metadata,
          },
        });
      }
    } catch (error: any) {
      // Store identifier and error message for response
      errors.push({ identifier, error: error.message || 'An error occurred while processing this stakepool.' });
      continue; // Skip to the next iteration
    }
  }

  const tenMinutesAgo = new Date(Date.now() - 600000); // 10 minutes in milliseconds

  for (const pool_id of normalizedPoolIds) {
    try {
      let stats = await prisma.stakepoolStats.findUnique({
        where: { pool_id },
      });

      if (!stats || stats.updated_at < tenMinutesAgo) {
        const { data: newStats } = await blockfrostAPI.get(`/pools/${pool_id}`);

        if (stats) {
          await prisma.stakepoolStats.update({
            where: { pool_id },
            data: {
              ...newStats,
              updated_at: new Date(),
            },
          });
        } else {
          await prisma.stakepoolStats.create({
            data: {
              pool_id,
              ...newStats,
            },
          });
        }
      }
    } catch (error: any) {
      // Store pool_id and error message for response
      errors.push({ pool_id, error: error.message || 'An error occurred while updating this stakepool stats.' });
      continue; // Skip to the next iteration
    }
  }

  try {
    const updatedStakePools = await prisma.stakepool.findMany({
      where: {
        pool_id: {
          in: normalizedPoolIds,
        },
      },
      include: {
        stats: true,
      },
    });

    successfulStakePools.push(...updatedStakePools);
  } catch (error: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: error.message || 'Error retrieving updated stakepools from the database.',
    });
  }

  // Return both successful and unsuccessful stakepools
  return { successfulStakePools, errors };
}