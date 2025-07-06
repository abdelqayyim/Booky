import { createSlice } from '@reduxjs/toolkit';
import {
  addDays,
} from 'date-fns';
export const RESPONSE_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed"
}
export const ROLES = { ADMIN: "admin", PROVIDER: "provider", CLIENT: "client" }
// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    clientImage: "/api/placeholder/50/50",
    service: "Hair Coloring",
    time: "09:00 AM",
    date: new Date(),
    duration: 90,
    phone: "(555) 123-4567",
    email: "sarah.johnson@email.com",
    location: "Downtown Salon - Chair 3",
    price: 150,
    notes: "Client prefers natural blonde highlights. Allergic to ammonia-based products.",
    status: "confirmed"
  },
  {
    id: 2,
    clientName: "Michael Chen",
    clientImage: "/api/placeholder/50/50",
    service: "Men's Haircut",
    time: "11:30 AM",
    date: new Date(),
    duration: 45,
    phone: "(555) 987-6543",
    email: "m.chen@email.com",
    location: "Main Floor - Station 2",
    price: 35,
    notes: "Regular client - usual fade cut with trim on top.",
    status: "confirmed"
  },
  {
    id: 3,
    clientName: "Jessica Williams",
    clientImage: "/api/placeholder/50/50",
    service: "Manicure & Pedicure",
    time: "02:15 PM",
    date: new Date(),
    duration: 75,
    phone: "(555) 456-7890",
    email: "jessica.w@email.com",
    location: "Nail Studio - Table 1",
    price: 65,
    notes: "Requested gel polish in coral pink. Has sensitive skin.",
    status: "confirmed"
  },
  {
    id: 4,
    clientName: "Michael Chen",
    clientImage: "/api/placeholder/50/50",
    service: "Men's Haircut",
    time: "05:30 PM",
    date: new Date(),
    duration: 45,
    phone: "(555) 987-6543",
    email: "m.chen@email.com",
    location: "Main Floor - Station 2",
    price: 35,
    notes: "Follow-up appointment for touch-up.",
    status: "confirmed"
  },
  {
    id: 5,
    clientName: "Emily Davis",
    clientImage: "/api/placeholder/50/50",
    service: "Facial Treatment",
    time: "10:00 AM",
    date: addDays(new Date(), 1),
    duration: 60,
    phone: "(555) 321-0987",
    email: "emily.davis@email.com",
    location: "Spa Room A",
    price: 90,
    notes: "First-time client. Oily skin type, looking for deep cleansing treatment.",
    status: "pending"
  },
  {
    id: 6,
    clientName: "John Smith",
    clientImage: "/api/placeholder/50/50",
    service: "Beard Trim",
    time: "04:00 PM",
    date: addDays(new Date(), 1),
    duration: 30,
    phone: "(555) 654-3210",
    email: "john.smith@email.com",
    location: "Barber Station",
    price: 25,
    notes: "Prefers classic professional look. Regular maintenance trim.",
    status: "confirmed"
  }
];

// Mock data for schedules
const mockSchedules = [
  {
    id: 1,
    day: "Monday",
    startTime: "09:00 AM",
    endTime: "05:00 PM"
  },
  {
    id: 2,
    day: "Tuesday",
    startTime: "09:00 AM",
    endTime: "05:00 PM"
  },
  {
    id: 3,
    day: "Wednesday",
    startTime: "09:00 AM",
    endTime: "05:00 PM"
  },
  {
    id: 4,
    day: "Thursday",
    startTime: "09:00 AM",
    endTime: "07:00 PM"
  },
  {
    id: 5,
    day: "Friday",
    startTime: "09:00 AM",
    endTime: "07:00 PM"
  },
  {
    id: 6,
    day: "Saturday",
    startTime: "10:00 AM",
    endTime: "03:00 PM"
  }
];
const mockDefaultSchedules = {
  userId: "user_001",
  weekStartDate: null, // null = default
  days: {
    Monday: [
      { startTime: "08:00", endTime: "10:00" },
      { startTime: "14:00", endTime: "17:00" },
    ],
    Tuesday: [{ startTime: "09:00", endTime: "17:00" }],
    Wednesday: [{ startTime: "09:00", endTime: "17:00" }],
    Thursday: [{ startTime: "10:00", endTime: "18:00" }],
    Friday: [{ startTime: "09:00", endTime: "15:00" }],
    Saturday: [],
    Sunday: [],
  },
}
const mockOverrideSchedules = [
  {
    userId: "user_001",
    weekStartDate: "2025-06-08", // Sunday
    days: {
      Monday: [
        { startTime: "10:00", endTime: "12:00" }, // shortened
        { startTime: "13:00", endTime: "14:00" },
      ],
      Tuesday: [], // no availability (override default)
      Wednesday: [{ startTime: "10:00", endTime: "16:00" }],
      // Thursday to Sunday inherit default
    },
  },
];
const initialState = {
  user: { id: 122343242, role: ROLES.PROVIDER, name: {firstName: "Abdel Qayyim", lastName:"Maazou Yahaya"}, email:"jackLeKing@gmail.com" },        
  isLoggedIn: true, 
  status: RESPONSE_STATUS.IDLE,    
  selectedAppointment: null,
  error: null,
  appointments: mockAppointments,
  schedules: mockSchedules,
  defaultSchedule: mockDefaultSchedules,
  overrideSchedule: mockOverrideSchedules
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      const { id, name, email } = action.payload;
      state.user = { id, name, email }; 
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSelectedAppointment(state, action) {
      state.selectedAppointment = action.payload
    }
  },
});

export const { login, logout, setStatus, setError,setSelectedAppointment } = userSlice.actions;
export default userSlice.reducer;
