import { createSlice } from "@reduxjs/toolkit";

export const RESPONSE_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};
export const ROLES = { ADMIN: "admin", PROVIDER: "provider", CLIENT: "client" };
const initialState = {
  uiMode: "light",
  currentForm: null,
  currentDate: new Date(),
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleUiMode(state) {
      if (state.uiMode === "light") {
        state.uiMode = "dark";
      } else {
        state.uiMode = "light";
      }
    },
    setCurrentForm(state, action) {
      state.currentForm = action.payload;
    },
    setCurrentDate(state, action) {
      state.currentDate = action.payload;
    },
  },
});

export const {
  toggleUiMode,
  setCurrentForm,
  setSelectedAppointment,
  setCurrentDate,
} = uiSlice.actions;
export default uiSlice.reducer;
