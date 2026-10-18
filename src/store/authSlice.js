import { createSlice } from "@reduxjs/toolkit";

function readUser() {
  try { return JSON.parse(localStorage.getItem("foodie-user") || "null"); }
  catch { return null; }
}

const authSlice = createSlice({
  name: "auth",
  initialState: { token: localStorage.getItem("foodie-token"), user: readUser(), status: "idle", error: "" },
  reducers: {
    loginStarted(state) { state.status = "loading"; state.error = ""; },
    loginSucceeded(state, action) { state.status = "succeeded"; state.token = action.payload.token; state.user = action.payload.user; state.error = ""; },
    loginFailed(state, action) { state.status = "failed"; state.error = action.payload; },
    logout(state) { state.status = "idle"; state.token = null; state.user = null; state.error = ""; },
  },
});

export const { loginStarted, loginSucceeded, loginFailed, logout } = authSlice.actions;
export default authSlice.reducer;
