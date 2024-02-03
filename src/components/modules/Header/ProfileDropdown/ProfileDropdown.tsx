import { forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { withClickOutside } from "@/utils/withClickOutside";
import { useSignout } from "@/hooks/auth/useSignout";

import Link from "next/link";
import AvatarMini from "@/components/modules/Profile/AvatarMini/AvatarMini";
import { IoMdExit } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

import type { DropdownProps } from "@/utils/withClickOutside";

import styles from "./ProfileDropdown.module.scss";

type Props = {
  user: IUser;
};

const ProfileDropdown = forwardRef<HTMLDivElement, DropdownProps & Props>(
  ({ opened, toggleDropdown, user }, ref) => {
    const { signout } = useSignout();

    if (!user) return null;

    const toggle = () => {
      toggleDropdown(!opened);
    };

    return (
      <div ref={ref} className={styles["profile-dropdown"]}>
        <div className={styles["avatar"]} onClick={toggle}>
          <AvatarMini avatar={user.avatarMini} />
        </div>
        <div className={styles["dropdown-wrapper"]}>
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ opacity: 0, transform: "translateX(100%)" }}
                animate={{ opacity: 1, transform: "translateX(0)" }}
                exit={{ opacity: 0, scale: 0 }}
                className={`${styles["dropdown"]} theme-bg__inverse`}
                style={{ transformOrigin: "right top" }}
              >
                <div className={styles["credentials"]}>
                  <p>username: {user.username}</p>
                  <p>email: {user.email}</p>
                </div>
                <div className={styles["dropdown-controls"]}>
                  <Link className={styles["dropdown-control"]} href="/profile">
                    <FaRegUser />
                    Profile
                  </Link>
                  <button
                    className={styles["dropdown-control"]}
                    onClick={() => signout(user.id)}
                  >
                    <IoMdExit />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);

ProfileDropdown.displayName = "ProfileDropdown";

export default withClickOutside(ProfileDropdown);
