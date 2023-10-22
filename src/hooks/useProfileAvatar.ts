import { useAppSelector } from "./useAppSelector";
import { selectUserAvatar } from "@/store/profile/profile.selectors";

export const useProfileAvatar = () => {
  const avatar = useAppSelector(selectUserAvatar);
  return avatar;
};
