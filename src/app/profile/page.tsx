import Profile from "@/app/components/templates/Profile/Profile";

import styles from "./profile.module.scss";

const ProfilePage = () => {
  return (
    <section className={styles["profile-page"]}>
      <Profile />
    </section>
  );
};

export default ProfilePage;
