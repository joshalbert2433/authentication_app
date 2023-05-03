import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface googleProviderProps {
	clientId: string;
	clientSecret: string;
}

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		} as googleProviderProps),
	],
	secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
