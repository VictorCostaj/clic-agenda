// Vamos criar utilitários para trabalhar com datas

import { ptBR } from 'date-fns/locale'
import { format , startOfWeek, addDays, startOfDay, addMinutes} from 'date-fns';


export const formatDate = (date: Date): string => {
    return format(date, 'dd/MM/YYY', {locale: ptBR});
};

export const formatTime = (date: Date): string => {
    return format(date, 'HH: mm', {locale: ptBR});
};

export const formatDateTime = (date: Date): string => {
    return format (date, 'dd/MM/yyyy HH:mm', {locale: ptBR,})
}

export const getWeekDays = (date: Date): Date[] => {
    const start = startOfWeek(date, { weekStartsOn: 0});
    return Array.from({ length: 7}).map((_, i) => addDays(start, i));
};

export const getTimeSlots = (date: Date, start = 8, end = 18, interval = 30): Date[] => {
  const slots: Date[] = [];
  const dayStart = startOfDay(date);
  
  for (let hour = start; hour < end; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      slots.push(addMinutes(dayStart, hour * 60 + minute));
    }
  }
  
  return slots;
};