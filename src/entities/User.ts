export class User {
    constructor (
        public id: string,
        public username: string,
        public name: string,
        public email: string,
        public cpf: string,
        public password: string
    ) {
    }

    static fromPrisma(data: any): User {
        return new User (data.id, data.username, data.name, data.email, data.cpf, data.password)
    }

    static fromPrismaArray(data: any[]): User[] {
        const userArray: User[] = []

        data.forEach(u => {
            const user: User = User.fromPrisma(u)
            userArray.push(user)
        })
        return userArray
    }
}