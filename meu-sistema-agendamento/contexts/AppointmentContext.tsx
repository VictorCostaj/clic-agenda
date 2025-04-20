// Criando o contexto para gerenciar os agendamentos 

import { Appointment, Client } from '@/types';
import React, {createContext, ReactNode, useState } from 'react';


interface AppointentContextType {
    appointments: Appointment[];
    clients: Client[];
    addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
    updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
    deleteAppointment: (id: string) => void;
    addClient: (client: Omit<Client, 'id'>) => void;
    getClientById: (id: string) => Client | undefined;
}

const AppointmentContext = createContext<AppointentContextType | undefined>(undefined);
export const AppointmentProvider = ({children}: {children: ReactNode }) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [clients, setClients] = useState<Client[]>([]);

    const addAppointment = (appointmentsData: Omit<Appointment, 'id' >) => {
        const newAppointment = {
            ...appointmentsData, 
            id: Math.random().toString(36). substring(2,9)
        };
        setAppointments([...appointments, newAppointment]);
    };

    const updateAppointment = (id: string, appointmentData: Partial<Appointment>) => {
        setAppointments(
            appointments.map(appointment =>
                appointment.id === id ? { ...appointment, ...appointmentData } : appointment
            )
        );
    };


    const deleteAppointment = (id: string) => {
        setAppointments(appointments.filter(appointment => appointment.id !== id));
    };

    const addClient = (clientData: Omit<Client, 'id'>) => {
        const newClient = {
            ...clientData, 
            id: Math.random().toString(36).substring(2,9)
        };
        setClients ([...clients, newClient]);
    };

    const getClientById = (id: string) => {
        return clients.find(client => client.id === id);
    };

    return (
        <AppointmentContext.Provider 
        value={{
            appointments,
            clients,
            addAppointment,
            updateAppointment,
            deleteAppointment,
            addClient,
            getClientById
        }}

        >
            {children}
        </AppointmentContext.Provider>
    );

}