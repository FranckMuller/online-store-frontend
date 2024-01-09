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
    setCredentials: (state, { payload }: PayloadAction<IUser | null>) => {
      state.user = payload;
    },
    setAvatarMini: (state, { payload }: PayloadAction<string>) => {
      if(state.user) {
      state.user.avatarMini = payload;
      }
    },
  },
});

export const { setCredentials, setAvatarMini } = authSlice.actions;

export default authSlice.reducer;
