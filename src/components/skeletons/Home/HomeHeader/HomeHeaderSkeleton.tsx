import { TbBrandNextjs } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";

import styles from "./HomeHeaderSkeleton.module.scss";

const HomeHeaderSkeleton = () => {
  return (
    <div className={styles["header"]}>
      <span className={styles["logo"]}>
        <TbBrandNextjs />
      </span>

      <div className={`${styles["search"]} search-input`}>
        <input placeholder="Looking for..." type="text" />
        <BsSearch />
      </div>
    </div>
  );
};

export default HomeHeaderSkeleton;
