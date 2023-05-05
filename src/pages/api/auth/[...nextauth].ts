import { profile } from "console";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {
	CredentialsProviderType,
	CredentialsConfig,
} from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { compare } from "bcrypt";

interface googleProviderProps {
	clientId: string;
	clientSecret: string;
}

interface credentialProps {
	domain: any;
	username: any;
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		} as googleProviderProps),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "Type email here...",
				},
				password: {
					label: "password",
					type: "password",
				},
			},
			authorize: async (credentials) => {
				// database lookup
				// if (
				// 	credentials?.email === "josh" &&
				// 	credentials?.password === "albert"
				// ) {
				// 	return {
				// 		id: "1",
				// 		email: "juswa",
				// 		password: "sample@email.com",
				// 	};
				// }
				// return null;
				if (!credentials?.email || !credentials.password) {
					return null;
				}

				const user = await prisma.userTest.findUnique({
					where: {
						email: credentials.email,
					},
				});

				console.log(user);
				if (!user) {
					return null;
				}

				const isPasswordValid = await compare(
					credentials.password,
					user.password
				);

				if (!isPasswordValid) {
					return null;
				}

				return {
					id: user.id + "",
					email: user.email,
				};
			},
		}),
	],
	secret: process.env.JWT_SECRET,
	adapter: PrismaAdapter(prisma),

	pages: {
		signIn: "/profile",
		signOut: "/",
	},
	// session: {
	// 	strategy: "jwt",
	// },
	session: {
		strategy: "database", // Store sessions in the database and store a sessionToken in the cookie for lookups
		maxAge: 30 * 24 * 60 * 60, // 30 days to session expiry
		updateAge: 24 * 60 * 60, // 24 hours to update session data into database
	},
};

export default NextAuth(authOptions);
