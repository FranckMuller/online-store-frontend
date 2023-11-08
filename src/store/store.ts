import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./auth/auth.slice";
import profileReducer from "./profile/profile.slice";
import themeReducer from "./theme/theme.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
