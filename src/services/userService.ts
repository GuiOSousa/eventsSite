import { UserRepository } from "../repositories/userRepository"
import { User } from "../entities/User"
import { UserNotFoundError } from "../errors/clientErrors/ClientErrors"
import dotenv from "dotenv";
dotenv.config();

export class UserService {
    
    static async createUser(params: any){
        const userData = new User(params.id, params.username, params.name, params.email, params.cpf, params.password)

        if (userData.id != undefined) {
            if (await UserRepository.getById(userData.id)) {
                throw new Error("ID já cadastrado.")
            }
        }
    
        return UserRepository.create(userData)
    }

    static async getUserById(id: string): Promise<User | null>{
        return await UserRepository.getById(id)
    }

    static async getUserByEmail(params: any): Promise<User | null>{
        const email = params.email
        return await UserRepository.getByEmail(email)
    }


    static async getAllUsers(): Promise<User[]> {
        return await UserRepository.getAll()
    }

    static async updateUser(params: any): Promise <User> {
        const userData = new User(params.id, params.username, params.name, params.email, params.cpf, params.password)
        if (!(UserRepository.getById(userData.id))) {
            throw new UserNotFoundError()
        }
        return await UserRepository.update(userData) 
    }

    static async deleteUser(id: string): Promise <void> {
        if (!(UserRepository.getById(id))) {
            throw new UserNotFoundError()
        }
        return await UserRepository.delete(id)
    }
}