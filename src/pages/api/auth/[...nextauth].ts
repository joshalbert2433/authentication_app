import { profile } from "console";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

interface googleProviderProps {
	clientId: string;
	clientSecret: string;
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		} as googleProviderProps),
	],
	secret: process.env.JWT_SECRET,
	adapter: PrismaAdapter(prisma),
};

export default NextAuth(authOptions);
