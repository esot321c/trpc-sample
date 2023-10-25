import { Prisma } from '@prisma/client';
import { prisma } from '@server/prisma';
import { blockfrostAPI } from './blockfrostApi';

const EPOCHS_PER_PAGE = 100; // blockfrost api max

type TotalStakePerEpoch = {
  epoch: number;
  totalStake: number;
}

type Fiso = ({
  approvedStakepools: {
    id: number;
    startEpoch: number;
    endEpoch: number;
    fisoId: number;
    poolId: string;
  }[];
} & {
  id: number;
  tokenAmount: number;
  tokenName: string;
  tokenTicker: string;
  startEpoch: number;
  endEpoch: number;
  projectSlug: string;
  totalStakeEpoch: Prisma.JsonValue;
}) | null


export const calculatePageRange = (startEpoch: number, endEpoch: number, currentEpoch: number): [number, number] => {
  // Ensure the endEpoch doesn't exceed the currentEpoch
  const adjustedEndEpoch = Math.min(endEpoch, currentEpoch);

  // Calculate the distance from the current epoch to the start and end epochs
  const distanceToStart = currentEpoch - startEpoch;
  const distanceToEnd = currentEpoch - adjustedEndEpoch;

  // Calculate the page numbers, considering we are counting backwards and each page contains EPOCHS_PER_PAGE epochs
  // We use Math.floor for the startPage because we are counting backwards, so the start of the range is actually when we hit the epoch number
  // We use Math.ceil for the endPage to ensure we include the entire range of epochs needed
  const startPage = Math.floor(distanceToEnd / EPOCHS_PER_PAGE) + 1;
  const endPage = Math.ceil(distanceToStart / EPOCHS_PER_PAGE); // We don't add 1 here because we want this page to be included

  return [startPage, endPage];
};

const hasStakePoolHistory = async (poolId: string, startEpoch: number, endEpoch: number): Promise<TStakepoolHistory[]> => {
  const stakePoolHistory = await prisma.stakepoolHistory.findMany({
    where: {
      pool_id: poolId,
      epoch: {
        gte: startEpoch,
        lte: endEpoch,
      },
    },
  });
  return stakePoolHistory
};

const fetchPoolHistory = async (poolId: string, startEpoch: number, endEpoch: number, currentEpoch: number) => {
  let allPoolHistory: TStakepoolHistory[] = [];

  const [startPage, endPage] = calculatePageRange(startEpoch, endEpoch, currentEpoch);

  for (let currentPage = startPage; currentPage <= endPage; currentPage++) {
    const response = await blockfrostAPI.get(`/pools/${poolId}/history`, {
      params: { page: currentPage, order: 'desc' } // 'desc' because we are counting backwards from the current epoch
    });
    const data: TStakepoolHistory[] = response.data;
    allPoolHistory.push(...data);
  }

  const dbEntries = allPoolHistory.map(entry => ({
    ...entry,
    pool_id: poolId,
  }));

  await prisma.stakepoolHistory.createMany({ data: dbEntries, skipDuplicates: true, });

  // Filter data for relevant epochs
  const relevantData = allPoolHistory.filter(entry =>
    entry.epoch >= startEpoch && entry.epoch <= endEpoch
  );

  return relevantData;
};

const fetchUserStakeHistory = async (userStakeAddress: string, startEpoch: number, endEpoch: number, currentEpoch: number) => {
  let allStakeHistory: TUserStakeHistory[] = [];

  const [startPage, endPage] = calculatePageRange(startEpoch, endEpoch, currentEpoch);

  for (let currentPage = startPage; currentPage <= endPage; currentPage++) {
    const response = await blockfrostAPI.get(`/accounts/${userStakeAddress}/history`, {
      params: { page: currentPage, order: 'desc' } // 'desc' because we are counting backwards
    });
    const data: TUserStakeHistory[] = response.data;

    allStakeHistory.push(...data);
  }

  // Prepare the data for database insertion
  const dbEntries = allStakeHistory.map(entry => ({
    active_epoch: entry.active_epoch,
    amount: entry.amount,
    pool_id: entry.pool_id,
    user_reward_address: userStakeAddress,
  }));

  // Insert the fetched data into the database
  await prisma.userStakeHistory.createMany({
    data: dbEntries,
    skipDuplicates: true, // This ensures that we only insert new records and skip any duplicates
  });

  const relevantData = allStakeHistory.filter(entry =>
    entry.active_epoch >= startEpoch && entry.active_epoch <= endEpoch
  );
  return relevantData;
};

const isTotalStakePerEpochArray = (data: any): data is TotalStakePerEpoch[] => {
  return Array.isArray(data) && data.every(item =>
    typeof item === 'object' &&
    item !== null &&
    'epoch' in item &&
    typeof item.epoch === 'number' &&
    'totalStake' in item &&
    typeof item.totalStake === 'number'
  );
}

const checkTotalStake = async (
  fiso: Fiso,
  startEpoch: number,
  endEpoch: number,
  currentEpoch: number,
  approvedFisoStakePools: {
    id: number;
    startEpoch: number;
    endEpoch: number;
    fisoId: number;
    poolId: string;
  }[]
) => {
  if (fiso) {
    let epochStakes: TotalStakePerEpoch[] = []
    // validate data to make typescript happy (end ensure it works properly too)
    if (isTotalStakePerEpochArray(fiso?.totalStakeEpoch)) epochStakes = fiso.totalStakeEpoch;

    const finalEndEpoch = Math.min(currentEpoch, endEpoch);
    const totalEpochsExpected = finalEndEpoch - startEpoch + 1;

    // If the data is already complete, return it
    if (epochStakes.length === totalEpochsExpected) {
      return epochStakes;
    }

    // If there are missing data, determine the missing epochs
    const existingEpochs = epochStakes.map(stake => stake.epoch);
    const allExpectedEpochs = Array.from({ length: totalEpochsExpected }, (_, i) => startEpoch + i);
    const missingEpochs = allExpectedEpochs.filter(epoch => !existingEpochs.includes(epoch));

    // Prepare a structure to hold the fetched pool histories
    const allPoolHistories: { [poolId: string]: typeof fetchPoolHistory extends (...args: any[]) => Promise<infer R> ? R : never } = {};

    // Fetch all relevant pool histories first
    for (const fisoStakePool of approvedFisoStakePools) {
      const poolId = fisoStakePool.poolId;

      // Pool's start epoch or FISO's start epoch, whichever is greater
      const poolStartEpoch = Math.max(fisoStakePool.startEpoch, startEpoch);

      // Pool's end epoch or FISO's end epoch, whichever is smaller
      const poolEndEpoch = Math.min(fisoStakePool.endEpoch, finalEndEpoch);

      // Check if the history for this pool and epoch range exists in the database
      const existingPoolHistory = await hasStakePoolHistory(poolId, poolStartEpoch, finalEndEpoch);

      if (existingPoolHistory) {
        allPoolHistories[poolId] = existingPoolHistory;
      } else {
        allPoolHistories[poolId] = await fetchPoolHistory(poolId, poolStartEpoch, poolEndEpoch, currentEpoch);
      }
    }

    // Now, calculate the total stakes for the missing epochs
    for (const missingEpoch of missingEpochs) {
      let totalStakeForEpoch = 0;

      for (const fisoStakePool of approvedFisoStakePools) {
        const poolId = fisoStakePool.poolId;

        // Only consider the stake pool if the missing epoch is within the pool's active range
        if (missingEpoch >= fisoStakePool.startEpoch && missingEpoch <= fisoStakePool.endEpoch) {
          // Find the specific epoch data from the fetched history
          const poolHistory = allPoolHistories[poolId];
          const epochData = poolHistory.find(entry => entry.epoch === missingEpoch);

          // If the specific epoch data is found, add its active stake to the total stake for the epoch
          if (epochData) {
            totalStakeForEpoch += parseInt(epochData.active_stake, 10);
          }
        }
      }

      // Add the data for the missing epoch
      epochStakes.push({ epoch: missingEpoch, totalStake: totalStakeForEpoch });
    }

    // Sort the array based on epoch before returning
    epochStakes.sort((a, b) => a.epoch - b.epoch);

    // Update the FISO's totalStakeEpoch field with the new complete data
    await prisma.fiso.update({
      where: { id: fiso.id },
      data: { totalStakeEpoch: epochStakes },
    });

    return epochStakes;
  }
}

export const calculateISPORewards = async (
  fisoId: number,
  userStakeAddress: string,
  currentEpochProvided: number | undefined
): Promise<number> => {
  try {
    // Fetch FISO details from the database
    const fiso = await prisma.fiso.findUnique({
      where: { id: fisoId },
      include: { approvedStakepools: true }
    });

    if (!fiso) {
      throw new Error(`FISO with ID ${fisoId} not found`);
    }

    // Extract necessary details from the FISO
    const { startEpoch: fisoStartEpoch, endEpoch: fisoEndEpoch, tokenAmount: totalTokens, approvedStakepools } = fiso;

    // get or set current epoch, only doing the API call here if necessary (not already done outside of the function)
    let currentEpoch = currentEpochProvided
    if (!currentEpoch) {
      const { data: currentEpochData } = await blockfrostAPI.get(`/epochs/latest`);
      currentEpoch = currentEpochData.epoch;
      if (!currentEpoch) throw new Error("Cannot retrieve current epoch")
    }

    let totalEarned = 0;

    // Fetch the user's stake history within the FISO's period
    const userStakeHistories = await prisma.userStakeHistory.findMany({
      where: {
        user_reward_address: userStakeAddress,
        active_epoch: {
          gte: fisoStartEpoch,
          lte: Math.min(fisoEndEpoch, currentEpoch), // The FISO's end epoch or the current epoch, whichever is smaller
        },
      },
    });

    let userStakeDetails: {
      poolId: string;
      epoch: number;
      amount: number;
    }[] = []

    const epochsToFetch = Math.min(fisoEndEpoch, currentEpoch) - fisoStartEpoch + 1;

    if (userStakeHistories.length === epochsToFetch) {
      userStakeDetails = userStakeHistories.map(history => ({ poolId: history.pool_id, epoch: history.active_epoch, amount: Number(history.amount) }));
    } else {
      console.log(`Database missing ${epochsToFetch - userStakeHistories.length} epochs for user history`)
      const confirmedUserStakeHistories = await fetchUserStakeHistory(userStakeAddress, fisoStartEpoch, fisoEndEpoch, currentEpoch)
      userStakeDetails = confirmedUserStakeHistories.map(history => ({ poolId: history.pool_id, epoch: history.active_epoch, amount: Number(history.amount) }));
    }

    // Filter out stakepools that are not in the FISO's approved list
    const approvedPoolIds = approvedStakepools.map(pool => pool.poolId);
    const relevantUserStakes = userStakeDetails.filter(detail => approvedPoolIds.includes(detail.poolId));

    // Fetch the total stake per epoch.
    const totalStakePerEpoch = await checkTotalStake(
      fiso,
      fisoStartEpoch,
      fisoEndEpoch,
      currentEpoch,
      approvedStakepools
    );

    if (!totalStakePerEpoch) {
      throw new Error("Unable to retrieve total stake per epoch")
    }

    // Now, for each relevant stake, check if the stakepool was active during the staked epoch and calculate rewards
    for (const { poolId, epoch, amount } of relevantUserStakes) {
      const stakepool = approvedStakepools.find(pool => pool.poolId === poolId);

      // Check if the stakepool was active during this epoch
      if (epoch >= stakepool!.startEpoch && epoch <= stakepool!.endEpoch) {
        // Get the total stake for this epoch
        const epochTotalStake = totalStakePerEpoch.find(stake => stake.epoch === epoch)?.totalStake || 0;

        // Calculate rewards for this epoch
        const tokensPerEpoch = totalTokens / (fisoEndEpoch - fisoStartEpoch + 1);
        const userRewardForEpoch = (amount / epochTotalStake) * tokensPerEpoch;
        totalEarned += userRewardForEpoch;
      }
    }

    return totalEarned;
  } catch (error) {
    console.error("An error occurred while calculating rewards:", error);
    return 0; // Return 0 or handle the error as appropriate
  }
}