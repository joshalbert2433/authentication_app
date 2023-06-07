import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { hash, genSalt } from "bcrypt";
const prisma = new PrismaClient();

const updateUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "PATCH") {
		const { name, bio, phone, email, password } = req.body;

		const hashPassword = password ? await hash(password, 12) : password;

		try {
			const updatedUser = await prisma.user.update({
				where: { email: email },
				data: { name, bio, phone, email, password: hashPassword },
			});

			res.status(200).json({
				error: false,
				message: "User updated successfully.",
				user: updatedUser,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				error: true,
				message: "Failed to update user.",
			});
		}
	} else {
		res.status(405).json({ error: true, message: "Method Not Allowed" });
	}
};

export default updateUserHandler;
