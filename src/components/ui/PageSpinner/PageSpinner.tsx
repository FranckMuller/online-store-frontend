import { useEffect } from "react";
import { useAppearanceDelay } from "@/hooks/useAppearanceDelay";

import styles from "./PageSpinner.module.scss";

type Props = {
  isLoading: boolean;
  appearenceDelay?: number;
  minDisplay?: number;
};

const PageSpinner = ({ isLoading, ...appearenceDelayOptions }: Props) => {
  const show = useAppearanceDelay(isLoading, { ...appearenceDelayOptions });
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
