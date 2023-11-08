"use client";
import { useTheme } from "@/hooks/useTheme";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { ThemeMode } from "@/store/theme/theme.slice";

import styles from "./ThemeButton.module.scss";

const ThemeButton = () => {
  const { toggleTheme, theme } = useTheme();
  const classButtonMode = styles[theme];

  return (
    <button
      className={`${styles["button"]} ${classButtonMode}`}
      onClick={() => toggleTheme()}
    >
      <span className={styles['icon']}>
        {theme === ThemeMode.Dark ? <BsFillSunFill /> : <BsMoonFill />}
      </span>
    </button>
  );
};

export default ThemeButton;
