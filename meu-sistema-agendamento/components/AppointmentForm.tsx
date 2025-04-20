// Agora, vamos criar o formulário de agendamento
// components/AppointmentForm.tsx
import React, { useState } from 'react';
import { useAppointments } from '../contexts/AppointmentContext';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { formatDate, formatTime, getTimeSlots } from '../utils/dateUtils';

const AppointmentForm: React.FC = () => {
  const { clients, addAppointment } = useAppointments();
  const [date, setDate] = useState<Date>(new Date());
  const [clientId, setClientId] = useState<string>('');
  const [service, setService] = useState<string>('');
  const [duration, setDuration] = useState<number>(60);
  const [notes, setNotes] = useState<string>('');
  
  const availableTimeSlots = getTimeSlots(date);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addAppointment({
      clientId,
      date,
      duration,
      service,
      notes,
      status: 'scheduled'
    });
    
    // Reset form
    setClientId('');
    setService('');
    setDuration(60);
    setNotes('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <h2>Novo Agendamento</h2>
      
      <div className="form-group">
        <label htmlFor="client">Cliente:</label>
        <select 
          id="client" 
          value={clientId} 
          onChange={(e) => setClientId(e.target.value)}
          required
        >
          <option value="">Selecione um cliente</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="date">Data:</label>
        <input 
          type="date" 
          id="date" 
          value={format(date, 'yyyy-MM-dd')} 
          onChange={(e) => setDate(new Date(e.target.value))}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="time">Horário:</label>
        <select 
          id="time" 
          value={formatTime(date)} 
          onChange={(e) => {
            const [hours, minutes] = e.target.value.split(':').map(Number);
            const newDate = new Date(date);
            newDate.setHours(hours, minutes);
            setDate(newDate);
          }}
          required
        >
          {availableTimeSlots.map((slot, i) => (
            <option key={i} value={formatTime(slot)}>
              {formatTime(slot)}
            </option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="service">Serviço:</label>
        <input 
          type="text" 
          id="service" 
          value={service} 
          onChange={(e) => setService(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="duration">Duração (minutos):</label>
        <input 
          type="number" 
          id="duration" 
          min="15" 
          step="15" 
          value={duration} 
          onChange={(e) => setDuration(Number(e.target.value))}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="notes">Observações:</label>
        <textarea 
          id="notes" 
          value={notes} 
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      
      <button type="submit" className="submit-button">
        Agendar
      </button>
    </form>
  );
};

export default AppointmentForm;