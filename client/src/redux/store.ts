import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import tournamentsReducer from "./slices/tournamentSlice";

export const store = configureStore({
  reducer: {
    tournaments: tournamentsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
