import styles from "./Error.module.scss";

type Props = {
  text: string;
  style?: {};
};

const Error = ({ text, style = {} }: Props) => {
  return (
    <span style={style} className={styles["error"]}>
      {text}
    </span>
  );
};

export default Error;
