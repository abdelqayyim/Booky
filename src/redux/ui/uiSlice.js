import { createSlice } from "@reduxjs/toolkit";

export const RESPONSE_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};
export const UIMODES = {
  light: "light",
  dark: "dark"
}
const getInitialUiMode = () => {
  const stored = localStorage.getItem('booky-theme');
  return stored === UIMODES.dark ? UIMODES.dark : UIMODES.light;
};
export const ROLES = { ADMIN: "admin", PROVIDER: "provider", CLIENT: "client" };
const initialState = {
  uiMode: getInitialUiMode(),
  currentForm: null,
  currentDate: new Date().toISOString(),
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleUiMode(state) {
      if (state.uiMode === UIMODES.light) {
        state.uiMode = UIMODES.dark;
      } else {
        state.uiMode = UIMODES.light;
      }
    },
    setCurrentForm(state, action) {
      state.currentForm = action.payload;
    },
    setCurrentDate: {
  reducer(state, action) {
    state.currentDate = action.payload; // now guaranteed to be a string
  },
  prepare(date) {
    return { payload: date instanceof Date ? date.toISOString() : date };
  }
}
  },
});

export const {
  toggleUiMode,
  setCurrentForm,
  setSelectedAppointment,
  setCurrentDate,
} = uiSlice.actions;
export default uiSlice.reducer;
