import SigninForm from "@/components/modules/Auth/SigninForm/SigninForm";

import styles from "./Signin.module.scss";

const Signin = () => {
  return (
    <div className={styles["signin"]}>
      <SigninForm />
    </div>
  );
};

export default Signin;
