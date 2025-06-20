import { createSlice } from '@reduxjs/toolkit';

export const RESPONSE_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed"
}
export const ROLES = {ADMIN: "admin", PROVIDER:"provider", CLIENT:"client"}
const initialState = {
  uiMode: "light",
  currentForm: null,

}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleUiMode(state) {
      if (state.uiMode == "light") {
        state.uiMode = 'dark'
      } else {
        state.uiMode = 'light'
      }
    },
    setCurrentForm(state, action) {
      state.currentForm = action.payload
    }
  },
});

export const { toggleUiMode, setCurrentForm } = uiSlice.actions;
export default uiSlice.reducer;
