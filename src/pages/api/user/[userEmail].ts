import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { userEmail } = req.query;

	console.log(userEmail, "from userAPI");

	try {
		const data = await prisma.user.findFirst({
			where: {
				email: userEmail as string,
			},
		});

		if (data === null) {
			return null;
		}

		const { password, ...dataWithoutPassword } = data;

		// console.log(dataWithoutPassword);

		res.status(200).json(data);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "An error occurred while fetching the data.",
		});
	}
}
