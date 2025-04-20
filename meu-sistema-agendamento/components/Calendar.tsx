// Vamos criar o componente de calendário
// components/Calendar.tsx
import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getWeekDays, formatDate } from '../utils/dateUtils';
import { useAppointments } from '../contexts/AppointmentContext';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { appointments } = useAppointments();
  
  const weekDays = getWeekDays(currentDate);
  
  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };
  
  const getAppointmentsForDate = (date: Date) => {
    const dateString = formatDate(date);
    return appointments.filter(
      appointment => formatDate(new Date(appointment.date)) === dateString
    );
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>&lt;</button>
        <h2>{format(currentDate, 'MMMM yyyy', { locale: ptBR })}</h2>
        <button onClick={goToNextMonth}>&gt;</button>
      </div>
      
      <div className="weekday-header">
        {weekDays.map((day, index) => (
          <div key={index} className="weekday">
            {format(day, 'EEEE', { locale: ptBR })}
          </div>
        ))}
      </div>
      
      <div className="days-grid">
        {weekDays.map((day, index) => {
          const dayAppointments = getAppointmentsForDate(day);
          
          return (
            <div 
              key={index} 
              className={`day ${format(new Date(), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') ? 'today' : ''}`}
            >
              <div className="day-number">{format(day, 'd')}</div>
              <div className="appointments-preview">
                {dayAppointments.length > 0 ? (
                  <div className="appointment-count">
                    {dayAppointments.length} agendamento(s)
                  </div>
                ) : (
                  <div className="no-appointments">Livre</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};