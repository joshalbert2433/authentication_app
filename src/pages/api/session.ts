import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "./auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		res.status(200).json({
			error: "unauthorized",
		});
	}

	// if (!session) {
	// 	return new NextResponse(JSON.stringify({}), {
	// 		status: 401,
	// 	});
	// }

	console.log("GET API", session);
	// return NextResponse.json({ authenticated: !!session });
	return res.json({ authenticated: session });
}
