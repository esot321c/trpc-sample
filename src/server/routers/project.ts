import { TProject } from '@lib/types/zod-schemas/projectSchema';
import { prisma } from '@server/prisma';
import { mapFullProjectFromDb } from '@server/utils/mapProjectObject';
import { z } from 'zod';
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  createProject: adminProcedure
    .input(TProject)
    .mutation(async ({ input, ctx }) => {
      if (input.socials && input.tokenomics) {
        try {
          // Create a new project along with its related records
          const newProject = await prisma.project.create({
            data: {
              name: input.name,
              slug: input.slug,
              shortDescription: input.shortDescription,
              whitepaperLink: input.whitepaperLink,
              description: input.description,
              blockchains: input.blockchains,
              fundsRaised: input.fundsRaised,
              bannerImgUrl: input.bannerImgUrl,
              avatarImgUrl: input.avatarImgUrl,
              isLaunched: input.isLaunched,
              isDraft: input.isDraft,
              fisoPoolIds: input.fisoPoolIds,
              // Create the related records
              socials: { create: input.socials },
              roadmap: { create: input.roadmap },
              team: { create: input.team },
              tokenomics: {
                create: {
                  tokenName: input.tokenomics.tokenName,
                  totalTokens: input.tokenomics.totalTokens,
                  tokenTicker: input.tokenomics.tokenTicker,
                  // For the nested Tokenomic records
                  tokenomic: {
                    create: input.tokenomics.tokenomics,
                  },
                },
              },
              whitelists: { create: input.whitelists },
            },
          });

          return newProject;
        } catch (error: any) {
          throw new Error(error)
        }
      }
      else throw new Error('Missing tokenomics or socials fields')
    }),
  getProject: publicProcedure
    .input(z.object({
      slug: z.string().nullish(),
    }))
    .query(async ({ input }) => {
      if (input.slug) {
        const project = await prisma.project.findUnique({
          where: {
            slug: input.slug,
          },
          include: {
            socials: true,
            roadmap: true,
            team: true,
            tokenomics: {
              include: {
                tokenomic: true,
              },
            },
            whitelists: true
          },
        });

        if (!project) {
          throw new Error("Project not found");
        }

        const mappedProject = mapFullProjectFromDb(project)

        return mappedProject;
      }
      else return undefined
    }),
})