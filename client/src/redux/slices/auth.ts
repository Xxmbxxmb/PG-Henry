import { createSlice } from "@reduxjs/toolkit";
import { login, refreshToken, signOut } from "./authThunk";

const initialState: {
  token: string | null;
  decoded: { id: string; email: string; username: string } | null;
  loading: boolean;
  error: string;
} = {
  token: null,
  decoded: null,
  loading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.decoded = action.payload.decoded.payload;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.token = null;
      state.decoded = null;
      state.loading = false;
      state.error = action.payload as string;
    });

    // RefreshToken
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.decoded = action.payload.decoded.payload;
      state.loading = false;
    });
    builder.addCase(refreshToken.rejected, (state) => {
      state.token = null;
      state.decoded = null;
      state.loading = false;
    });

    // SignOut
    builder.addCase(signOut.fulfilled, (state) => {
      state.loading = false;
      state.token = null;
      state.decoded = null;
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
