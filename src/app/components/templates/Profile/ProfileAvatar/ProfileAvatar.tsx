import styles from "./ProfileAvatar.module.scss";

type Props = {
  avatar: string
}

const ProfileAvatar = ({ avatar }: Props) => {
  console.log(avatar);
  if (!avatar) return null;
  return (
    <div className={styles["avatar"]}>
      <img src={avatar} />
    </div>
  );
};

export default ProfileAvatar;
