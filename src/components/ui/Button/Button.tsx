import styles from "./Button.module.scss";

type Props = {
  children: React.ReactNode;
  handleClick: () => void;
  className?: string;
  type?: "sm" | "md" | "lg";
};

const Button = ({ handleClick, type = "md", className, children }: Props) => {
  let classNames = `${styles['button']} ${styles[type]}`;
  if (className) classNames = classNames + " " + className;

  return (
    <button onClick={handleClick} className={classNames}>
      {children}
    </button>
  );
};

export default Button;
