import { NextApiRequest, NextApiResponse } from "next";
import user from "./user/[userEmail]"; // Import your user route handler

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	// Implement your logic to handle different API routes
	const { slug } = req.query;

	switch (slug) {
		case "user":
			user(req, res);
			break;
		default:
			res.status(404).end();
	}
}
