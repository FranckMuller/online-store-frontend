import Link from "next/link";

import styles from "./GeneralMenu.module.scss";

const items = [
  {
    href: "/profile/products",
    name: "My products",
  },
  {
    href: "/profile/cart",
    name: "My cart",
  },
  {
    href: "/profile/checkout",
    name: "Checkout",
  },
  {
    href: "/profile/orders",
    name: "My orders",
  },
  {
    href: "/profile/favorites-shops",
    name: "Favorites shops",
  },
  {
    href: "/profile/cupons",
    name: "Cupons",
  },
  {
    href: "/profile/products-reviews",
    name: "Products reviwes",
  },
  {
    href: "/profile/mesages",
    name: "Messages",
  },
];

const GeneralMenu = () => {
  return (
    <div className={styles["menu"]}>
      <h3 className={styles["heading"]}>General</h3>
      <ul>
        {items && items.length &&
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

export default GeneralMenu;
