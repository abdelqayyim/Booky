// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import uiReducer from './ui/uiSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer
  },
});

export default store;
