export class UserNotFoundError extends Error {
    public code: number = 404
    constructor() {
        super("Usuário não encontrado.")
    }
}

export class EventNotFoundError extends Error {
    public code: number = 404
    constructor() {
        super("Evento não encontrado.")
    }
}