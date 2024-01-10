import styles from "./Checkbox.module.scss";

type Props = {
  id?: string;
  label?: null | string | React.ReactNode;
  isChecked?: boolean;
  onChange: () => void;
};

const Checkbox = ({
  id = "",
  label = "",
  isChecked = false,
  onChange,
}: Props) => {
  return (
    <div className={styles["checkbox"]}>
      <input id={id} type="checkbox" onChange={onChange} checked={isChecked} />
      <label htmlFor={id} className={styles["label"]}>
        {label ? label : ""}
      </label>
    </div>
  );
};

export default Checkbox;
