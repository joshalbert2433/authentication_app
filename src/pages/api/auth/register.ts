import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			const { email, password } = await req.body;

			//SERVER INPUT VALIDATION
			if (!(email && password && password.length >= 8)) {
				res.status(400).json({
					error: true,
					status: "Invalid user parameters",
				});
			}

			const isProfileExists = await prisma.user.findUnique({
				where: {
					email: email,
				},
			});

			if (isProfileExists) {
				res.status(403).json({
					error: true,
					status: "User already exists",
				});
			}

			const hashed = await hash(password, 12);

			const user = await prisma.user.create({
				data: {
					email,
					password: hashed,
				},
			});

			if (!user) {
				res.status(500).json({
					error: false,
					status: "Unable to create user account",
				});
			}

			if (user) {
				res.json({
					error: false,
					status: "User has been created",
				});
			}
		} catch (err: any) {
			res.status(500).json({
				error: err.message,
			});
		}
	}
}
