import { useEffect } from "react";

import styles from "./PageSpinner.module.scss";


const ElementSpinner = () => {
  return (
    <div className={styles["element-spinner"]}>
      <div className={styles["loader"]}></div>
    </div>
  );
};

export default ElementSpinner;
