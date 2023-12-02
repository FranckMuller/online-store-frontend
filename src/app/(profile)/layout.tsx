import cn from "clsx";

import RootLayout from "@/RootLayout";
import Header from "@/components/modules/Header/Header";
import ProfileSidebar from "@/components/modules/ProfileSidebar/ProfileSidebar";

import styles from "@/app/layout.module.scss";

type Props = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: Props) => {
  return (
    <RootLayout>
      <Header />
      <div className={styles["wrapper"]}>
        <ProfileSidebar />
        <main className={cn(styles["main"], "theme-bg")}>{children}</main>
      </div>
    </RootLayout>
  );
};

export default ProfileLayout;
