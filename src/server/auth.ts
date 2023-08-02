import {
  getServerSession,
  type NextAuthOptions
} from "next-auth";

import { ProviderType } from "next-auth/providers/index";

const SUPPORTED_WALLETS = [
  'begin', 'eternl', 'flint', 'lace', 'nami', 'nufi', 'gerowallet', 'typhoncip30', 'vespr'
];

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      address?: string;
      image?: string;
    };
  }
  interface User {
    id: string;
    name?: string;
    defaultAddress?: string;
    nonce?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    wallets: Wallet[];
    accounts: Account[];
    sessions: Session[];
  }
  interface Account {
    id: string;
    userId?: string;
    type: ProviderType;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    user: User; // Assuming you have a User interface defined
  }
  interface UserProfile {
    id: string;
    auth_user_id?: string;
    created_at: Date;
    updated_at: Date;
    email_verified?: Date;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    legal_name?: string;
    birth_date?: string;
    country?: string;
    birth_country?: string;
    birth_state?: string;
    birth_place?: string;
    marital_status?: string;
    nationality?: string;
    occupation?: string;
    addresses: Address[];
    image?: string;
    transactions: Transaction[];
  }
  interface Address {
    id: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state: string;
    region?: string;
    district?: string;
    province?: string;
    postal_code: string;
    country: string;
    user_id: string;
    user: UserProfile;
  }
  interface Wallet {
    id: number;
    type: typeof SUPPORTED_WALLETS[number];
    address: string;
    user_id: string;
    user?: UserProfile;
  }
  interface Transaction {
    id: string;
    description: string;
    amount: string;
    currency: string;
    completed: boolean;
    created_at: string;
    user?: UserProfile;
  }
}

// /**
//  * Options for NextAuth.js used to configure adapters, providers, callbacks,
//  * etc.
//  *
//  * @see https://next-auth.js.org/configuration/options
//  **/
// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_SECRET_ID!
//     }),
//     CredentialsProvider({
//       name: "z",
//       credentials: {
//         message: {
//           label: "Message",
//           type: "text",
//           placeholder: "0x0",
//         },
//         signature: {
//           label: "Signature",
//           type: "text",
//           placeholder: "0x0",
//         },
//       },
//       async authorize(credentials) {
//         try {
//           const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"))
//           const domain = process.env.DOMAIN
//           if (siwe.domain !== domain) {
//             return null
//           }

//           if (siwe.nonce !== (await getCsrfToken({ req }))) {
//             return null
//           }

//           await siwe.validate(credentials?.signature || "")
//           return {
//             id: siwe.address,
//           }
//         } catch (e) {
//           return null
//         }
//       },
//     })
//   ],
//   callbacks: {
//     async session({ session, user }) {
//       // Include the user's ID in the session
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: user.id,
//         },
//       };
//     },
//   },
//   jwt: {

//   }
// };

// /**
//  * Wrapper for `getServerSession` so that you don't need to import the
//  * `authOptions` in every file.
//  *
//  * @see https://next-auth.js.org/configuration/nextjs
//  **/
// export const getServerAuthSession = (ctx: {
//   req: GetServerSidePropsContext["req"];
//   res: GetServerSidePropsContext["res"];
// }) => {
//   return getServerSession(ctx.req, ctx.res, authOptions);
// };