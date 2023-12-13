import { forwardRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from 'next/link'
import { withClickOutside, DropdownProps } from "@/utils/withClickOutside";
import { useAuth } from "@/hooks/useAuth";
import * as Api from "@/api";
import { AnimatePresence, motion } from "framer-motion";
import AvatarMini from "../AvatarMini/AvatarMini";

import styles from "./ProfileDropdown.module.scss";

type Props = {
  user: IUser;
};

const ProfileDropdown = forwardRef<HTMLDivElement, DropdownProps & Props>(
  ({ opened, toggleDropdown, user }, ref) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const {
      mutate: signout,
      isLoading,
      isSuccess,
    } = useMutation({
      mutationFn: (userId: string) => Api.auth.signout(userId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["auth/check"] });
        router.replace("/signin");
      },
    });

    if (!user) return null;

    const toggle = () => {
      toggleDropdown(!opened);
    };

    return (
      <div ref={ref} className={styles["profile-dropdown"]}>
        <div onClick={toggle}>
          <AvatarMini />
        </div>
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={styles["dropdown"]}
              style={{ transformOrigin: "right top" }}
            >
              <div className={styles["credentials"]}>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>
                  <Link href="/profile">settings</Link>
                </p>
              </div>
              <button
                className={styles["logout"]}
                onClick={() => signout(user.id)}
              >
                logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ProfileDropdown.displayName = "ProfileDropdown";

export default withClickOutside(ProfileDropdown);
