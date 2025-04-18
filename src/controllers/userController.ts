import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { z } from "zod";
import { UserRepository } from "../repositories/userRepository";

export class UserController {

	static async createUser(req: Request, res: Response) {
		try {
			const user = await UserService.createUser(req.body);
			res.status(201).json(user);
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}

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

	static async updateUser(req: Request, res: Response): Promise<any> {
		try {
			const user = await UserService.updateUser(req.body)
			res.json(user)
		} catch (error: any) {
			res.status(500).json({ message: "Erro ao buscar usuário", error: error.message });
		}
	}

	static async deleteUser(req: Request, res: Response): Promise <any> {
		try {

			const userId = req.body.id;
			const loggedUserId = (req as any).user.userId

			if (userId !== loggedUserId) {
				return res.status(403).json({ error: "Você só pode deletar sua própria conta." });
			}

			await UserService.deleteUser(userId)
			res.json("Usuário deletado com sucesso.")
		} catch (error: any) {
			res.status(500).json({ message: "Erro ao buscar usuário", error: error.message });
		}
	}

	static async assignUserToEvent(req: Request, res: Response): Promise <any> {
		try {
			await UserService.assignUserToEvent(req.body)
			res.json("Usuário adicionado com sucesso.")
		} catch(error: any) {
			res.status(500).json({ message: "Erro ao adicionar usuário", error: error.message });
		}
	}

	static async unassignUserToEvent(req: Request, res: Response): Promise <any> {
		try {
			await UserService.unassignUserToEvent(req.body)
			res.json("Usuário removido com sucesso.")
		} catch(error: any) {
			res.status(500).json({ message: "Erro ao remover usuário", error: error.message });
		}
	}
	
}