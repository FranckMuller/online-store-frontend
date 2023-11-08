import styles from "./profile.module.scss";

type Props = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: Props) => {
  return <section className={styles["layout"]}>{children}</section>;
};

export default ProfileLayout;
