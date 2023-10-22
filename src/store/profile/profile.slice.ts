import { createSlice } from "@reduxjs/toolkit";
import type { IFullestUser } from "@/interfaces/users.interface";

export type ProfileState =  {
  id: string | null;
  username: string | null;
  email: string | null;
  avatarMini: string | null;
  phone: string | null;
  avatar: string | null;
}

const initialState: ProfileState = {
  id: null,
  username: null,
  email: null,
  avatarMini: null,
  phone: null,
  avatar: null
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
});

export default profileSlice.reducer;
