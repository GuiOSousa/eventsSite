import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { z } from "zod";

export class UserController {

    static async getAllUsers(req: Request, res: Response): Promise<any> {
        try {
			const users = await UserService.getAllUsers();
			if (!users) return res.status(404).json({ message: "Usuário não encontrado" });
			res.json(users);
		} catch (error: any) {
			res.status(500).json({ message: "Erro ao buscar usuários", error: error.message });
		}
    }

	static async getUserById(req: Request, res: Response): Promise<any> {
		try {
			const user = await UserService.getUserById(req.params.id);
			if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
			res.json(user);
		} catch (error: any) {
			res.status(500).json({ message: "Erro ao buscar usuário", error: error.message });
		}
	}

	static async getUserByEmail(req: Request, res: Response): Promise<any> {
		try {
			const userSchema = z.object({
				email: z.string().email()
			})
			const userData = userSchema.parse(req.body)
			const user = await UserService.getUserByEmail(userData);
			if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
			res.json(user);
		} catch (error: any) {
			res.status(500).json({ message: "Erro ao buscar usuário", error: error.message });
		}
	}

	static async createUser(req: Request, res: Response) {
		try {
			const user = await UserService.createUser(req.body);
			res.status(201).json(user);
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}
}