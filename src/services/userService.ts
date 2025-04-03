import { UserRepository } from "../repositories/userRepository"
import { User } from "../entities/User"

export class UserService {
    
    static async createUser(params: any){
        const userData = new User(params.id, params.username, params.name, params.email, params.cpf, params.password)

        if (await UserRepository.getById(userData.id)) {
            throw new(Error)
        }


    }

    static async getUserById(id: string): Promise<User | null>{
        return await UserRepository.getById(id)
    }

    static async getAllUsers(): Promise<User[]> {
        return await UserRepository.getAll()
    }
}