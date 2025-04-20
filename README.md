/ Estrutura do projeto:
// pages/
// ├─ _app.tsx
// ├─ index.tsx
// ├─ appointments/
// │  ├─ index.tsx
// │  ├─ new.tsx
// components/
// ├─ Calendar.tsx
// ├─ AppointmentForm.tsx
// ├─ ClientList.tsx
// ├─ Layout.tsx
// contexts/
// ├─ AppointmentContext.tsx
// types/
// ├─ index.ts
// utils/
// ├─ dateUtils.ts
// styles/
// ├─ globals.css


!----------------------------------------!!!!-----------------------------------------!!!!---------------------!!!!-------------------------

// Primeiro, vamos configurar os tipos básicos em types/index.ts
// types/index.ts
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  date: Date;
  duration: number; // em minutos
  service: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}


!---!!--------------// Agora, vamos criar o contexto para gerenciar os ss agendamentos---------------------!!!!
Tipos e Interface
• Appointment e Client:
        Tipos importados que definem a
        estrutura dos dados
• AppointmentContextType:
        Define o formato do contexto com
        todos os dados e funções que
        serão disponibilizados
• Omit<T, K>:
        Tipo utilitário que omite campos
        específicos (id é gerado pelo
        sistema, não pelo usuário)


        Funções CRUD
• addAppointment:
- Gera ID aleatório único
- Adiciona novo agendamento
• updateAppointment:
- Usa map para atualizar apenas
o item com o ID correspondente
• deleteAppointment:
- Usa filter para remover o item
com o ID específico
• Outras funções:
- addClient, getClientById
- Seguem padrões similares


Provider e Consumo
• AppointmentContext:
- Criado com createContext
- Valor inicial undefined
• AppointmentProvider:
- Componente wrapper que
gerencia todo o estado
- Fornece acesso ao contexto
• children:
- Componentes envolvidos pelo
Provider terão acesso ao contexto
usando useContext()
- Hook useAppointment poderia ser
criado para facilitar o consumo