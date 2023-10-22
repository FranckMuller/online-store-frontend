import Link from "next/link";

import styles from "./GeneralMenu.module.scss";

const GeneralMenu = () => {
  return (
    <div className={styles["menu"]}>
      <h3>General</h3>
      <ul>
        <li>
          <Link href={"/settings/orders"}>Orders</Link>
        </li>
        <li>
          <Link href={"/settings/favorites"}>Favorites</Link>
        </li>
        <li>
          <Link href={"/settings/favorites-shops"}>Favorites shops</Link>
        </li>
        <li>
          <Link href={"/settings/cupons"}>Cupons</Link>
        </li>
        <li>
          <Link href={"/settings/products-reviews"}>Products reviwes</Link>
        </li>
        <li>
          <Link href={"/mesages"}>Messages</Link>
        </li>
      </ul>
    </div>
  );
};

export default GeneralMenu;
