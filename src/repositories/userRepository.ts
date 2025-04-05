import { PrismaClient } from "@prisma/client";
import { User } from "../entities/User";

export class UserRepository {
    constructor(){}

    static async create(user: User): Promise<User> {
        const prisma = new PrismaClient()
        const userData = await prisma.user.create({
            data: {
                username: user.username,
                name: user.name,
                cpf: user.cpf,
                email: user.email,
                password: user.password
            }
        })
        return User.fromPrisma(userData)
    }

    static async getById(id: string): Promise<User | null> {
        const prisma = new PrismaClient()
        const userData = await prisma.user.findUnique(
            {where: { id }}
        )
        return userData ? User.fromPrisma(userData) : null
    }

    static async getAll(): Promise<User[]> {
        const prisma = new PrismaClient()
        const users = await prisma.user.findMany()

        return User.fromPrismaArray(users)
    }

    static async getByEmail(email: string): Promise<User | null> {
        const prisma = new PrismaClient()
        const userData = await prisma.user.findUnique(
            {where: { email: email }}
        )
        return userData ? User.fromPrisma(userData) : null
    }

    static async update(userData: User): Promise <User> {
        const prisma = new PrismaClient()
        const id = userData.id

        await prisma.user.update({
            where: { id },
            data: {
                username: userData.username,
                name: userData.name,
                cpf: userData.cpf,
                email: userData.email,
                password: userData.password
            }
        })
        
        return userData
    }

    static async delete(id: string) {
        const prisma = new PrismaClient()
        await prisma.user.delete({
            where: {id}
        })
        return
    }
}

