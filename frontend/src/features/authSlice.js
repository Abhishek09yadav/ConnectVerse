import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authToken: null,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userData = action.payload.userData;
      state.authToken = action.payload.authToken;
    },
    deleteCredentials: () => initialState,
  },
});

export const { setCredentials, deleteCredentials } = authSlice.actions;
export default authSlice.reducer;
