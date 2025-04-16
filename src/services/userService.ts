import { UserRepository } from "../repositories/userRepository"
import { User } from "../entities/User"
import { EventNotFoundError, UserNotFoundError } from "../errors/clientErrors/ClientErrors"
import dotenv from "dotenv";
import { EventRepository } from "../repositories/eventRepository";
import bcrypt from 'bcrypt';
dotenv.config();

export class UserService {
    
    static async createUser(params: any){
        const hashPassword = await bcrypt.hash(params.password, 10)
        const userData = new User(params.id, params.username, params.name, params.email, params.cpf, hashPassword)

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

    static async assignUserToEvent(params: any): Promise <any> {
        const userId = params.userId
        const eventId = params.eventId

        if (!userId || !UserRepository.getById(userId)) {
            throw new UserNotFoundError()
        }

        if (!eventId || !EventRepository.getById(eventId)) {
            throw new EventNotFoundError()
        }

        await UserRepository.assignToEvent(userId, eventId)
    }

    static async unassignUserToEvent(params: any): Promise <any> {
        const userId = params.userId
        const eventId = params.eventId

        if (!UserRepository.getById(userId)) {
            throw new UserNotFoundError()
        }

        if (!EventRepository.getById(eventId)) {
            throw new EventNotFoundError()
        }

        await UserRepository.unassignToEvent(userId, eventId)
    }


}