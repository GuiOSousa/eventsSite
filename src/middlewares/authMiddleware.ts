import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction): any {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ error: "Token não fornecido." });
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || "minha_chave_secreta");
		(req as any).user = decoded
		next();
	} catch (err) {
		return res.status(401).json({ error: "Token inválido." });
	}
}