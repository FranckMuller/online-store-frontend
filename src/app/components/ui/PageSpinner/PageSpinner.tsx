import { useEffect } from "react";

import styles from "./PageSpinner.module.scss";

type Props = {
  isLoading: boolean;
};

const PageSpinner = ({ isLoading }: Props) => {
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className={styles["page-spinner"]}>
      <div className={styles["loader"]}></div>
    </div>
  );
};

export default PageSpinner;
