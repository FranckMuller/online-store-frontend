import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum ThemeMode {
  Light = "light",
  Dark = "dark",
}

const initialState: string = ThemeMode.Light;

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, { payload }: PayloadAction<string>) => {
      console.log(payload);
      state = payload;
      return state
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
