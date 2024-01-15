"use client";
import { useTheme } from "@/hooks/useTheme";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { ThemeMode } from "@/store/theme/theme.slice";

import styles from "./ThemeButton.module.scss";

type Props ={
  className?: string
}

const ThemeButton = ({className}: Props) => {  
  const { toggleTheme, theme } = useTheme();
  const classButtonMode = styles[theme];
  return (
    <button
      className={`${styles["button"]} ${classButtonMode} ${className} || ''`}
      onClick={() => toggleTheme()}
    >
      <span className={styles["icon"]}>
        <span className={styles["light-icon"]}>
          <BsFillSunFill />
        </span>

        <span className={styles["dark-icon"]}>
          <BsMoonFill />
        </span>
      </span>
    </button>
  );
};

export default ThemeButton;
