import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import logger from "redux-logger";

import themeReducer from "./theme/theme.slice";
import cartReducer from "./cart/cart.slice";

const rootReducer = combineReducers({
  theme: themeReducer,
  cart: cartReducer
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
     ).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
