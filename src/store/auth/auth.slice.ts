import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "@/interfaces/users.interface";

export interface AuthState {
  user: IUser | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    },
  },
});

export const {setCredentials} = authSlice.actions

export default authSlice.reducer
