import cn from "clsx";

import RootLayout from "@/app/RootLayout";
import Header from "@/components/modules/Header/Header";
import ProfileSidebar from "@/components/modules/ProfileSidebar/ProfileSidebar";
import AuthorizedGuard from "@/utils/AuthorizedGuard";

import styles from "@/app/layout.module.scss";

console.log(styles);

type Props = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: Props) => {
  return (
    <RootLayout>
      <AuthorizedGuard>{children}</AuthorizedGuard>
    </RootLayout>
  );
};

export default ProfileLayout;
