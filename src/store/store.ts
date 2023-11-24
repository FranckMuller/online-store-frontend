import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import authReducer from "./auth/auth.slice";
import profileReducer from "./profile/profile.slice";
import themeReducer from "./theme/theme.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  theme: themeReducer,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
     ).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
