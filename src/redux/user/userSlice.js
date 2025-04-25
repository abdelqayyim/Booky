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
  error: null,
}
// const initialState = {
//   user: null,        // will store user object (e.g., { id, name, email })
//   isLoggedIn: false, // helpful for conditional rendering
//   status: RESPONSE_STATUS.IDLE,    // loading status: 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null,       // holds any error message
// };

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
  },
});

export const { login, logout, setStatus, setError } = userSlice.actions;
export default userSlice.reducer;
