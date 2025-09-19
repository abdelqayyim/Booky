// src/redux/user/apiRequests.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isSameDay } from 'date-fns';
import {
  mockAppointments,
  mockSchedules,
  mockDefaultSchedules,
  mockOverrideSchedules,
  monthlyData,
  dummySubscribedUsers,
  dummyServiceHistory,
  dummyDisputes
} from '../../api/mockData.js';

const delay = (data, time = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(data), time));

// Thunk to get appointments and schedules
export const getAppointmentsAndSchedules = createAsyncThunk(
  'user/getAppointmentsAndSchedules',
  async () => {
    // Simulate fetching data with delay
    await delay(null, 500);
    return {
      appointments: mockAppointments,
      schedules: mockSchedules,
      defaultSchedule: mockDefaultSchedules,
      overrideSchedule: mockOverrideSchedules,
    };
  }
);

// Thunk to get today's appointments and monthly stats
export const getTodayAppointmentsAndMonthStats = createAsyncThunk(
  'user/getTodayAppointmentsAndMonthStats',
  async () => {
    const today = new Date();

    // Filter appointments for today
    const todayAppointments = mockAppointments.filter((appt) =>
      isSameDay(new Date(appt.date), today)
    );

    // Simulate delay and return data
    await delay(null, 500);
    return {
      todayAppointments,
      monthlyData: monthlyData,
    };
  }
);

export const getServiceHistoryAndSubscribers = createAsyncThunk(
  'user/getServiceHistoryAndSubscribers',
  async () => {
    // Simulate API delay
    await delay(null, 500);

    return {
      serviceHistory: dummyServiceHistory,
      subscribedUsers: dummySubscribedUsers,
    };
  }
);

export const getDisputes = createAsyncThunk(
  'user/getDisputes',
  async () => {
    // Simulate API delay
    await delay(null, 500);

    return {
      disputes: dummyDisputes,
    };
  }
);
