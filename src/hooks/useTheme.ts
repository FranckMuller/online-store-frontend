import { useEffect } from "react";
import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import { selectTheme } from "@/store/theme/theme.selectors";
import { setTheme, ThemeMode } from "@/store/theme/theme.slice";

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const toggleTheme = () => {
    document.body.classList.toggle("dark_mode");

    if (theme === ThemeMode.Light) {
      dispatch(setTheme(ThemeMode.Dark));
      localStorage.setItem("theme", ThemeMode.Dark);
    } else {
      dispatch(setTheme(ThemeMode.Light));
      localStorage.setItem("theme", ThemeMode.Light);
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.body.classList.add(theme === ThemeMode.Light ? "dark_mode" : "body");
    if (theme) {
      dispatch(setTheme(theme));
    }
  }, []);

  return { theme, toggleTheme };
};
