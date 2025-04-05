import { EventRepository } from "../repositories/eventRepository"
import { Event } from "../entities/Event"
import { UserRepository } from "../repositories/userRepository"

export class EventService {
    
    static async createEvent(params: any){
        const eventData = new Event(params.id, params.title, params.date, params.ownerId)
        const eventOwner = UserRepository.getById(eventData.ownerId)

        if (eventData.id != undefined) {
            if (await EventRepository.getById(eventData.id)) {
                throw new Error("ID já cadastrado.")
            }
        }

        if (!eventOwner) {
            throw new Error("Usuário inválido.")
        }

        return EventRepository.create(eventData)
    }

    static async getEventById(id: string): Promise<Event | null>{
        return await EventRepository.getById(id)
    }

    static async getAllEvents(): Promise<Event[]> {
        return await EventRepository.getAll()
    }

    static async updateEvent(params: any): Promise <Event> {
        const eventData = new Event(params.id, params.title, params.date, params.ownerId)
        const eventOwner = UserRepository.getById(eventData.ownerId)

        if (!(EventRepository.getById(eventData.id))) {
            throw new Error("Evento não encontrado.")
        }
        
        if (!eventOwner) {
            throw new Error("Usuário inválido.")
        }

        return await EventRepository.update(eventData) 
    }

    static async deleteEvent(id: string): Promise <void> {
        if (!(EventRepository.getById(id))) {
            throw new Error("Evento não encontrado.")
        }
        return await EventRepository.delete(id)
    }
}