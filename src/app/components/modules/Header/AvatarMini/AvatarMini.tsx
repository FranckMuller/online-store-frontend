import styles from "./AvatarMini.module.scss";

type Props = {
  avatar: string;
};

const AvatarMini = ({ avatar }: Props) => {
  if (!avatar) return null;

  return (
    <div className={styles["avatar-mini"]}>
      <img src={avatar} />
    </div>
  );
};

export default AvatarMini;
