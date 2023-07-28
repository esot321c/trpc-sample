import { PrismaClient } from '@prisma/client';
import { TRPCResponse, initTRPC } from '@trpc/server';
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/client';

const prisma = new PrismaClient();
const t = initTRPC.create();

const router = t.router()
  .query('getPosts', {
    resolve: async () => {
      return await prisma.post.findMany();
    },
  })
  .mutation('createPost', {
    input: z.object({
      title: z.string(),
      content: z.string(),
    }),
    resolve: async ({ input }, { req }) => {
      const session = await getSession({ req });
      if (!session) {
        throw new Error('You must be signed in to create a post');
      }
      return await prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          author: { connect: { id: session.user.id } },
        },
      });
    },
  });

export default createNextApiHandler({
  router,
  createContext: async ({ req, res }) => {
    return { req, res, prisma };
  },
  onError({ error }) {
    console.error(error);
    return new TRPCResponse({
      status: error.httpStatus ?? 500,
      body: { error: { message: error.message, code: error.code } },
    });
  },
});