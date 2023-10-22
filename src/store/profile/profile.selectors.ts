import type { RootState } from "../store";
import type { ProfileState } from "./profile.slice";

export const selectUserAvatar = (state: RootState) => state.profile.avatarMini