import ProfileMenu from "./ProfileMenu/ProfileMenu";

import styles from "./ProfileSidebar.module.scss";

const ProfileSidebar = () => {
  return (
    <div className={`${styles["nav"]}`}>
      <div className={styles["menu"]}>
        <ProfileMenu />
      </div>
      <button className={styles["logout-btn"]}>Logout</button>
    </div>
  );
};

export default ProfileSidebar;
