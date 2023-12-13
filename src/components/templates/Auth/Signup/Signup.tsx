import SignupForm from "@/components/modules/SignupForm/SignupForm";

import styles from "./Signup.module.scss";

const Signup = () => {
  return (
    <div className={styles["signup"]}>
      <SignupForm />
    </div>
  );
};

export default Signup;
