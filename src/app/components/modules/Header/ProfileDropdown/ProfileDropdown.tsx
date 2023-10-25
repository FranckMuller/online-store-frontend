import { forwardRef } from "react";
import AvatarMini from "../AvatarMini/AvatarMini";
import { useAuth } from "@/hooks/useAuth";
import { withClickOutside, DropdownProps } from "@/utils/withClickOutside";

import styles from "./ProfileDropdown.module.scss";

const ProfileDropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ opened, toggleDropdown }, ref) => {
    const { user } = useAuth();
    if (!user) return null;

    const toggle = () => {
      toggleDropdown(!opened);
    };

    return (
      <div ref={ref} className={styles["profile-dropdown"]}>
        <div onClick={toggle}>
          <AvatarMini avatar={user.avatarMini} />
        </div>
        {opened && (
          <div className={styles["dropdown"]}>
            <div className={styles["credentials"]}>
              <p>{user.username}</p>
              <p>{user.email}</p>
            </div>
            <button className={styles["logout"]}>logout</button>
          </div>
        )}
      </div>
    );
  }
);

ProfileDropdown.displayName = "ProfileDropdown";

export default withClickOutside(ProfileDropdown);
