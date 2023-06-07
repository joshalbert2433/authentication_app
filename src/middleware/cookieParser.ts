import { NextApiRequest, NextApiResponse } from "next";
import { RequestHandler } from "express";
import cookieParser from "cookie-parser";

const cookieParserMiddleware: RequestHandler = cookieParser();

export default function cookieParserHandler(
	req: NextApiRequest,
	res: NextApiResponse,
	next: () => void
) {
	cookieParserMiddleware(req as any, res as any, next);
}
