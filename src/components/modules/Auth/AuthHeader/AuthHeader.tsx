import Link from "next/link";
import ThemeButton from "@/components/modules/ThemeButton/ThemeButton";

import styles from "./AuthHeader.module.scss";

const AuthHeader = () => {
  return (
    <div className={`${styles["header"]} header`}>
      <ul className={styles["nav"]}>
        <li>
          <Link href="/signin">Signin</Link>
        </li>
        <li>
          <Link href="/signup">Signup</Link>
        </li>
      </ul>
      <ThemeButton />
    </div>
  );
};

export default AuthHeader;
