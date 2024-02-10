import cn from "clsx";
import { useAppearanceDelay } from "@/utils/useAppearanceDelay";

import Spinner from "../Spinner/Spinner";

import styles from "./Button.module.scss";


export enum EButtonVariants {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  DANGER = "danger"
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  customClass?: string;
  variant?: EButtonVariants;
  loading?: boolean;
}

const getBtnClassNames = (
  variant?: EButtonVariants,
  customClass?: string,
  size?: "sm" | "md" | "lg"
) => {
  const BTN = "btn";
  const classNamesArray = [styles[BTN], styles[`${BTN}-${size}`]];

  if (variant) {
    classNamesArray.push(styles[`${BTN}-${variant}`]);
  } else {
    classNamesArray.push(styles[`${BTN}-${EButtonVariants.PRIMARY}`]);
  }

  if (customClass) {
    classNamesArray.push(customClass);
  }

  return classNamesArray.join(" ");
};

const Button = ({
  text,
  size = "md",
  onClick,
  variant,
  customClass,
  loading,
  ...props
}: Props) => {
  const classNames = getBtnClassNames(variant, customClass, size);
  const isLoading = loading ? useAppearanceDelay(loading) : false;
  const loadingClassName = isLoading ? styles["btn-loading"] : "";

  return (
    <button
      {...props}
      onClick={onClick}
      className={cn(classNames, loadingClassName)}
    >
      {text}
      {isLoading && (
        <span className={styles["btn-spinner"]}>
          <Spinner />
        </span>
      )}
    </button>
  );
};

export default Button;
