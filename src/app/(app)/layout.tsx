import cn from "clsx";

import RootLayout from "@/app/RootLayout";
import Header from "@/components/modules/Header/Header";
import Sidebar from "@/components/modules/Sidebar/Sidebar";

import styles from "@/app/layout.module.scss";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <RootLayout>
      <Header />
      <div className={styles["content-page"]}>
        <Sidebar />
        <main className={cn(styles["main"], "theme-bg")}>{children}</main>
      </div>
    </RootLayout>
  );
};

export default AppLayout;
