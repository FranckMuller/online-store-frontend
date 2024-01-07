import Image from "next/image";
import { FaUser } from "react-icons/fa";

import styles from "./AvatarMini.module.scss";

type Props = {
  avatar?: string;
};

const AvatarMini = ({ avatar }: Props) => {
  return (
    <div className={styles["avatar-mini"]}>
      {avatar ? (
        <Image alt="avatar" width={25} height={25} src={avatar} />
      ) : (
        <FaUser />
      )}
    </div>
  );
};

export default AvatarMini;
