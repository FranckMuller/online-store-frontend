import styles from "./ProfileAvatar.module.scss";

type Props = {
  avatar: string;
};

const ProfileAvatar = ({ avatar }: Props) => {
  if (!avatar) return null;
  return (
    <div className={styles["avatar"]}>
      <img src={avatar} alt="avatar" />
    </div>
  );
};

export default ProfileAvatar;
