import Link from "next/link";

import styles from "./SettingsMenu.module.scss";

const items = [
  {
    href: "profile/settings/delivery-addresses",
    name: "Delivery addresses",
  },
  {
    href: "profile/settings/saved-cards",
    name: "Saved cards",
  },
  {
    href: "profile/settings/personal-settings",
    name: "Personal settings",
  },
];

const SettingsMenu = () => {
  return (
    <div className={styles["menu"]}>
      <h3 className={styles["heading"]}>Settings</h3>
      <ul>
        {items &&
          items.length &&
          items.map((i) => (
            <li key={i.name}>
              <Link href={i.href}>
                <span>{i.name}</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SettingsMenu;
