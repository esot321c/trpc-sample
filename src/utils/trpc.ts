import type { AppRouter } from '@server/routers/_app';
import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import superjson from "superjson";

// function getBaseUrl() {
//   if (typeof window !== 'undefined')
//     // browser should use relative path
//     return '';
//   if (process.env.VERCEL_URL !== "" || process.env.VERCEL_URL !== undefined)
//     // reference for vercel.com
//     return `https://${process.env.VERCEL_URL}`;
//   // if (process.env.RENDER_INTERNAL_HOSTNAME)
//   //   // reference for render.com
//   //   return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
//   // assume localhost
//   return `https://127.0.0.1:${process.env.PORT ?? 3000}`;
// }

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      transformer: superjson,
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${process.env.NEXTAUTH_URL}/api/trpc`,
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
});