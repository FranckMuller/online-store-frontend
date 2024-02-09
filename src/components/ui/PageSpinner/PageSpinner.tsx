import { useEffect } from "react";
import { useAppearanceDelay } from "@/utils/useAppearanceDelay";
import styles from "./PageSpinner.module.scss";

type Props = {
  isLoading: boolean;
};

const PageSpinner = ({ isLoading }: Props) => {
  const show = useAppearanceDelay(isLoading);
  console.log(isLoading);
  useEffect(() => {
    if (show) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [show]);
  
  if (!show) return null;

  return (
    <div className={styles["page-spinner"]}>
      <div className={styles["loader"]}></div>
    </div>
  );
};

export default PageSpinner;
