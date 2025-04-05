export class Event {
    constructor (
        public id: string,
        public title: string,
        public date: Date,
        public ownerId: string
    ) {
    }

    static fromPrisma(data: any): Event {
        return new Event (data.id, data.title, data.date, data.ownerId)
    }

    static fromPrismaArray(data: any[]): Event[] {
        const eventArray: Event[] = []

        data.forEach(e => {
            const event: Event = Event.fromPrisma(e)
            eventArray.push(event)
        })
        return eventArray
    }
}