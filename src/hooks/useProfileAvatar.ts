import { useAppSelector } from "./useAppSelector";
import { selectUserAvatarMini } from "@/store/auth/auth.selectors";

export const useProfileAvatar = () => {
  const avatarMini = useAppSelector(selectUserAvatarMini);
  return avatarMini;
};
