import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
	static async login(req: Request, res: Response): Promise <any> {
		try {
			const { email, password } = req.body;
			const token = await AuthService.login(email, password);
			return res.status(200).json({ token });
		} catch (err: any) {
			return res.status(err.statusCode || 500).json({ error: err.message });
		}
	}
}