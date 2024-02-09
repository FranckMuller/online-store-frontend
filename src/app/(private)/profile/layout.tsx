import cn from "clsx";

import Header from "@/components/modules/Header/Header";
import ProfileSidebar from "@/components/modules/ProfileSidebar/ProfileSidebar";

import styles from "@/app/layout.module.scss";

console.log(styles);

type Props = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className={styles["content-page"]}>
        <ProfileSidebar />
        <main className={cn(styles["main"], "theme-bg")}>{children}</main>
      </div>
    </>
  );
};

export default ProfileLayout;
