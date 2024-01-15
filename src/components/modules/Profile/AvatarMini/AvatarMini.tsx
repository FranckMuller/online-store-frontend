import Image from "next/image";
import cn from "clsx";
import { FaUser } from "react-icons/fa";

import styles from "./AvatarMini.module.scss";

type Props = {
  avatar?: string;
  className?: string;
};

const AvatarMini = ({ avatar, className }: Props) => {
  return (
    <div className={cn(styles["avatar-mini"], className && className)}>
      {avatar ? (
        <Image alt="avatar" width={50} height={50} src={avatar} />
      ) : (
        <FaUser />
      )}
    </div>
  );
};

export default AvatarMini;
