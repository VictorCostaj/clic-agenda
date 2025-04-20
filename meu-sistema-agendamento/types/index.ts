// Primeiro, vamos configurar os tipos básicos em types/index.ts
// types/index.ts

export interface Client {
    id: string;
    name: string;
    email: string
    phone: string
}

export interface Appointment {
    id: string;
    clientId: string;
    date: Date;
    duration:number; // em minutos
    service: string;
    notes?: string;
    status: 'scheduled' | 'completed'| 'cancelled';
}