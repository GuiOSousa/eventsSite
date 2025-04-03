import { PrismaClient } from "@prisma/client";

async function main(): Promise<void> {
    const prisma = new PrismaClient()

    const user = await prisma.user.create({
        data: {
            username: "user_001",
            name: "Gui",
            cpf: "12345678910",
            email: "email@email.com",
            password: "aaa"
        }
    })

    console.log(user)
}

main()