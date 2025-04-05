import { PrismaClient } from "@prisma/client";
import { Event } from "../entities/Event";

export class EventRepository {
    constructor(){}

    static async create(event: Event): Promise<Event> {
        const prisma = new PrismaClient()
        const eventData = await prisma.event.create({
            data: {
                title: event.title,
                date: event.date,
                ownerId: event.ownerId
            }
        })
        return Event.fromPrisma(eventData)
    }

    static async getById(id: string): Promise<Event | null> {
        const prisma = new PrismaClient()
        const eventData = await prisma.event.findUnique(
            {where: { id }}
        )
        return eventData ? Event.fromPrisma(eventData) : null
    }

    static async getAll(): Promise<Event[]> {
        const prisma = new PrismaClient()
        const events = await prisma.event.findMany()

        return Event.fromPrismaArray(events)
    }

    static async update(eventData: Event): Promise <Event> {
        const prisma = new PrismaClient()
        const id = eventData.id

        await prisma.event.update({
            where: { id },
            data: {
                title: eventData.title,
                date: eventData.date,
                ownerId: eventData.ownerId
            }
        })
        
        return eventData
    }

    static async delete(id: string) {
        const prisma = new PrismaClient()
        await prisma.event.delete({
            where: {id}
        })
        return
    }
}
