import Link from "next/link";

import styles from "./SettingsMenu.module.scss";

const SettingsMenu = () => {
  return (
    <div className={styles["menu"]}>
      <h3>Settings</h3>
      <ul>
        <li>
          <Link href={"/settings/delivery-addresses"}>Delivery addresses</Link>
        </li>
        <li>
          <Link href={"/settings/saved-cards"}>Saved cards</Link>
        </li>
        <li>
          <Link href={"/settings/personal-settings"}>Personal settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default SettingsMenu;
