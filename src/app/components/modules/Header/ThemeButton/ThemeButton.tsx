"use client";
import { useTheme } from "@/hooks/useTheme";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { ThemeMode } from "@/store/theme/theme.slice";

import styles from "./ThemeButton.module.scss";

const ThemeButton = () => {
  const { toggleTheme, theme } = useTheme();
  const classButtonMode = styles[theme];
  console.log(classButtonMode);
  return (
    <button
      className={`${styles["button"]} ${classButtonMode}`}
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
