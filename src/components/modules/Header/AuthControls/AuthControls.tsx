import Link from "next/link";

import styles from "./AuthControls.module.scss";

const AuthControls = () => {

  return (
    <div className={styles["auth-controls"]}>
      <Link className={styles["registration"]} href={"/signup"}>
        Registration
      </Link>
      <Link className={styles["login"]} href={"/signin"}>
        Login
      </Link>
    </div>
  );
};

export default AuthControls;
