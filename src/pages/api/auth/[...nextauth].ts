// import prisma from '@lib/prisma';
// import { NextApiHandler } from 'next';
// import NextAuth, { User } from 'next-auth';
// import CredentialsProvider from "next-auth/providers/credentials";

// const options = {
//   providers: [
//     CredentialsProvider({
//       id: 'cardano-wallet',
//       name: 'Cardano Wallet',
//       credentials: {
//         wallet: { label: "Wallet Address", type: "text" },
//         signature: { label: "Signed Message", type: "text" }
//       },
//       authorize: async (credentials: any) => {
//         const user = await validateWalletAndSignature(credentials.wallet, credentials.signature);

//         if (user) {
//           // Create or get the user from your database
//           const existingUser = await prisma.user.findUnique({ where: { email: user.email! } });

//           if (existingUser) {
//             return existingUser;
//           } else {
//             const newUser = await prisma.user.create({
//               data: { email: user.email, name: user.name, /* additional user data */ },
//             });

//             return newUser;
//           }
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
//   database: process.env.POSTGRES_PRISMA_URL,
//   session: {
//     jwt: true,
//   },
//   callbacks: {
//     async jwt(token: any, user: User | undefined) {
//       if (user) {
//         token.id = user.id;
//       }

//       return token;
//     },
//     async session(session: any, token: any) {
//       session.user.id = token.id;

//       return session;
//     },
//   },
// };

// const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
// export default authHandler;

// async function validateWalletAndSignature(wallet: string, signature: string): Promise<User | null> {
//   // Implement wallet and signature validation logic
//   // Return user if validation is successful, otherwise null
// }