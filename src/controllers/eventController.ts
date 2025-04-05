import { Request, Response } from "express";
import { EventService } from "../services/eventService";
import { z } from "zod";

export class EventController {

    static async createEvent(req: Request, res: Response) {
        try {
            const event = await EventService.createEvent(req.body);
            res.status(201).json(event);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getAllEvents(req: Request, res: Response): Promise<any> {
        try {
            const events = await EventService.getAllEvents();
            if (!events) return res.status(404).json({ message: "Nenhum evento não encontrado" });
            res.json(events);
        } catch (error: any) {
            res.status(500).json({ message: "Erro ao buscar eventos", error: error.message });
        }
    }

    static async getEventById(req: Request, res: Response): Promise<any> {
        try {
            const event = await EventService.getEventById(req.params.id);
            if (!event) return res.status(404).json({ message: "Evento não encontrado" });
            res.json(event);
        } catch (error: any) {
            res.status(500).json({ message: "Erro ao buscar evento", error: error.message });
        }
    }

    static async updateEvent(req: Request, res: Response): Promise<any> {
        try {
            const event = await EventService.updateEvent(req.body)
            res.json(event)
        } catch (error: any) {
            res.status(500).json({ message: "Erro ao buscar evento", error: error.message });
        }
    }

    static async deleteEvent(req: Request, res: Response): Promise <any> {
        try {
            await EventService.deleteEvent(req.params.id)
            res.json("Evento deletado com sucesso.")
        } catch (error: any) {
            res.status(500).json({ message: "Erro ao buscar evento", error: error.message });
        }
    }
    
}