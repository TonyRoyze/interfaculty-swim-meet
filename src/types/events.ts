export interface Event {
    id: string
    event_id?: number
    faculty_id?: number
    name: string
    time: string
    points?: number
}

export interface Relay {
    id: string
    event_id?: number
    faculty_id?: number
    faculty: string
    time: string
    points?: number
}

