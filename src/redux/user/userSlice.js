import { createSlice } from "@reduxjs/toolkit";
import {
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { getAppointmentsAndSchedules, getTodayAppointmentsAndMonthStats, getServiceHistoryAndSubscribers, getDisputes } from "./apiRequests";

export const RESPONSE_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};
export const ROLES = { ADMIN: "admin", PROVIDER: "provider", CLIENT: "client" };
const initialState = {
  user: {
    id: 122343242,
    role: ROLES.PROVIDER,
    name: { firstName: "Abdel Qayyim", lastName: "Maazou Yahaya" },
    email: "jackLeKing@gmail.com",
  },
  isLoggedIn: true,
  status: RESPONSE_STATUS.IDLE,
  monthlyData: {
    bookings: 0,
    completed: 0,
    reviews: 0,
    revenue: 0
  },
  selectedAppointment: null, 
  selectedUserHistory: undefined,
  selectedUserSubscribed: undefined,

  subscribedUsers: [],
  serviceHistory: [],

  disputes: [],

  error: null,
  appointments: null,
  schedules: null,
  defaultSchedule: null,
  overrideSchedule: null,

};

export const CALENDAR_VIEWS = {
  DAY: "Day",
  WEEK: "Week",
  MONTH: "Month",
  YEAR: "Year",
  SCHEDULE: "Schedule",
};
export const filterAppointmentsByView = (view, currentDate, appointments) => {
  switch (view) {
    case CALENDAR_VIEWS.DAY:
      return appointments?.filter((appt) =>
        isSameDay(new Date(appt.date), currentDate)
      );
    case CALENDAR_VIEWS.WEEK:
      return appointments.filter((appt) =>
        isWithinInterval(new Date(appt.date), {
          start: startOfWeek(currentDate, { weekStartsOn: 0 }),
          end: endOfWeek(currentDate, { weekStartsOn: 0 }),
        })
      );
    case CALENDAR_VIEWS.MONTH:
      return appointments.filter((appt) =>
        isSameMonth(new Date(appt.date), currentDate)
      );
    default:
      return appointments;
  }
};
const userSlice = createSlice({
  name: "user",
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
      state.selectedAppointment = action.payload;
    },
    setSelectedUserHistory(state, action) {
      state.selectedUserHistory = action.payload
    },
    setSelectedUserSubscribed(state, action) {
      state.selectedUserSubscribed = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppointmentsAndSchedules.pending, (state) => {
        state.status = RESPONSE_STATUS.LOADING;
      })
      .addCase(getAppointmentsAndSchedules.fulfilled, (state, action) => {
        state.status = RESPONSE_STATUS.SUCCEEDED;
        state.appointments = action.payload.appointments;
        state.schedules = action.payload.schedules;
        state.defaultSchedule = action.payload.defaultSchedule;
        state.overrideSchedule = action.payload.overrideSchedule;
      })
      .addCase(getAppointmentsAndSchedules.rejected, (state, action) => {
        state.status = RESPONSE_STATUS.FAILED;
        state.error = action.error.message;
      })
    .addCase(getTodayAppointmentsAndMonthStats.pending, (state) => {
    state.status = RESPONSE_STATUS.LOADING;
  })
  .addCase(getTodayAppointmentsAndMonthStats.fulfilled, (state, action) => {
    state.status = RESPONSE_STATUS.SUCCEEDED;
    state.appointments = action.payload.todayAppointments;
    state.monthlyData = action.payload.monthlyData;
  })
  .addCase(getTodayAppointmentsAndMonthStats.rejected, (state, action) => {
    state.status = RESPONSE_STATUS.FAILED;
    state.error = action.error.message;
  })
    .addCase(getServiceHistoryAndSubscribers.pending, (state) => {
    state.status = RESPONSE_STATUS.LOADING;
  })
  .addCase(getServiceHistoryAndSubscribers.fulfilled, (state, action) => {
    state.status = RESPONSE_STATUS.SUCCEEDED;
    state.serviceHistory = action.payload.serviceHistory;
    state.subscribedUsers = action.payload.subscribedUsers;
  })
  .addCase(getServiceHistoryAndSubscribers.rejected, (state, action) => {
    state.status = RESPONSE_STATUS.FAILED;
    state.error = action.error.message;
  })
      .addCase(getDisputes.pending, (state) => {
    state.status = RESPONSE_STATUS.LOADING;
  })
  .addCase(getDisputes.fulfilled, (state, action) => {
    state.status = RESPONSE_STATUS.SUCCEEDED;
    state.disputes = action.payload.disputes;
  })
  .addCase(getDisputes.rejected, (state, action) => {
    state.status = RESPONSE_STATUS.FAILED;
    state.error = action.error.message;
  })
  },
});

export const { login, logout, setStatus, setError, setSelectedAppointment,setSelectedUserHistory, setSelectedUserSubscribed } =
  userSlice.actions;
export default userSlice.reducer;
