import { createSlice } from '@reduxjs/toolkit';

export const RESPONSE_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed"
}
export const ROLES = {ADMIN: "admin", PROVIDER:"provider", CLIENT:"client"}
const initialState = {
  user: { id: 122343242, role: ROLES.PROVIDER, name: {firstName: "Abdel Qayyim", lastName:"Maazou Yahaya"}, email:"jackLeKing@gmail.com" },        
  isLoggedIn: true, 
  status: RESPONSE_STATUS.IDLE,    
  selectedAppointment: null,
  error: null,
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
