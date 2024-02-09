import { useEffect } from "react";
import {useAppearanceDelay} from '@/utils/useAppearanceDelay'

import styles from "./ElementSpinner.module.scss";

const ElementSpinner = ({isLoading}: {isLoading: boolean}) => {
  const show = useAppearanceDelay(isLoading)
  if(!show) return null
  
  return (
    <div className={styles["element-spinner"]}>
      <div className={styles["loader"]}></div>
    </div>
  );
};

export default ElementSpinner;
