import { useState, useEffect,forwardRef } from "react";
import { withClickOutside, type DropdownProps } from "@/utils/withClickOutside";
import { FaCaretDown } from "react-icons/fa";

import styles from "./Select.module.scss";

type Option = { text: string; value: string };

type Props = {
  options: Array<Option>;
  onChange: (value: any) => void;
  defaultOption: Option;
  title?: string;
};

const Select = forwardRef<HTMLDivElement, DropdownProps & Props>(
  (
    { options, onChange, defaultOption, title, opened, toggleDropdown },
    ref
  ) => {
    const [current, setCurrent] = useState(defaultOption);

    const onToggle = () => {
      toggleDropdown(!opened);
    };

    const handleChange = (option: Option) => {
      setCurrent(option);
      onChange(option.value);
      toggleDropdown(false);
    };
    
    useEffect(() => {
      setCurrent(defaultOption)
    }, [defaultOption])
    

    if (!options) return null;

    return (
      <div ref={ref} className={styles["select"]}>
        <button className={styles["current"]} onClick={onToggle}>
          {title && <span className={styles["title"]}>{title}</span>}
          <span className={styles["text"]}>
            {current.text ? current.text : "choose option"}
          </span>
          <span className={styles["icon"]}>
            <FaCaretDown />
          </span>
        </button>
        {opened && (
          <ul className={styles["options"]}>
            {options.map(o => (
              <li
                key={o.value}
                className={styles["option"]}
                onClick={() => handleChange(o)}
              >
                {o.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default withClickOutside(Select);
