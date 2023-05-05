import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		switch (req.method) {
			case "POST":
				const { email, password, csrfToken } = req.body;

				if (!(email && password && password.length >= 1)) {
					res.status(400).json({
						statusText: "Invalid user parameters",
					});
					break;
				}

				const profileExists = await prisma.user.findMany({
					where: {
						email: email,
					},
				});

				if (
					profileExists &&
					Array.isArray(profileExists) &&
					profileExists.length > 0
				) {
					res.status(403).json({
						statusText: "User already exists",
					});
					break;
				}

				const hashPassword = await hash(password, 12);

				const user = await prisma.user.create({
					data: {
						email: email,
						password: hashPassword,
					},
				});

				if (!user) {
					res.status(500).json({
						statusText: "Unable to create user account",
					});
				}

				const account = await prisma.account.create({
					data: {
						userId: user.id,
						type: "credentials",
						provider: "credentials",
						providerAccountId: user.id,
					},
				});

				if (user && account) {
					res.status(200).json({
						id: user.id,
						name: user.name,
						email: user.email,
					});
				} else {
					res.status(500).json({
						statusText:
							"Unable to link account to created user profile",
					});
				}
				break;
			default:
				res.setHeader("Allow", ["POST"]);
				res.status(405).json({
					statusText: `Method ${req.method} Not Allowed`,
				});
		}
	} catch (error) {
		console.log(error);
	}
}
