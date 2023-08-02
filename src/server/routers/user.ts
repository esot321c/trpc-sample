import { generateNonce } from '@meshsdk/core';
import { prisma } from '@server/prisma';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getNonce: publicProcedure
    .input(z.object({
      userAddress: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const { userAddress } = input;

      if (!userAddress) {
        return { nonce: null }; // Return a default value or error if the input is not defined
      }

      // Check if a user with the given address already exists
      let user = await prisma.user.findUnique({
        where: { defaultAddress: userAddress },
      });

      // If the user doesn't exist, create a new user model in the database
      if (!user) {
        user = await prisma.user.create({
          data: {
            defaultAddress: userAddress,
            // Include any other fields you want to set here
          },
        });
      }

      const nonce = generateNonce('Sign to login: ');

      // Update the user's nonce in the database
      await prisma.user.update({
        where: { id: user.id },
        data: { nonce },
      });

      return { nonce };
    }),
});