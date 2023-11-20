import { forwardRef } from "react";
import AvatarMini from "../AvatarMini/AvatarMini";
import { useAuth } from "@/hooks/useAuth";
import { withClickOutside, DropdownProps } from "@/utils/withClickOutside";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./ProfileDropdown.module.scss";

const ProfileDropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ opened, toggleDropdown }, ref) => {
    const { user, isAuthChecking } = useAuth();
    
    if(!user) return null
    
      const toggle = () => {
        toggleDropdown(!opened);
      };

    return (
      <div ref={ref} className={styles["profile-dropdown"]}>
        <div onClick={toggle}>
          <AvatarMini avatar={user.avatarMini} />
        </div>
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={styles["dropdown"]}
              style={{ transformOrigin: "rigth top" }}
            >
              <div className={styles["credentials"]}>
                <p>{user.username}</p>
                <p>{user.email}</p>
              </div>
              <button className={styles["logout"]}>logout</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ProfileDropdown.displayName = "ProfileDropdown";

export default withClickOutside(ProfileDropdown);
