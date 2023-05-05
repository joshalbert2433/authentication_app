import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function Register(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { email, password } = await req.body;

		const hashed = await hash(password, 12);
		// const user = await prisma.user.create({
		// 	data: {
		// 		email,
		// 		password: hashed,
		// 	},
		// });
		// res.json({
		// 	user: user,
		// });

		console.log(hashed);
		const user = await prisma.userTest.create({
			data: {
                
				email,
				password: hashed,
			},
		});
		res.json({
			user: user,
		});
	} catch (err: any) {
		res.status(500).json({
			error: err.message,
		});
	}
}
