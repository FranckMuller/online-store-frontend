import Link from "next/link";

import * as Icons from "react-icons/md";

import * as Api from "@/api";

import type { IconType } from "react-icons";
import type { ICategory } from "@/interfaces/categories.interface";

import styles from "./Sidebar.module.scss";

type Props = {
  category: ICategory;
};

const Item = ({ category }: Props) => {
  if (!category) return null;
  const Icon: IconType = Icons[`${category.icon}` as keyof typeof Icons];

  return (
    <Link href="/">
      <span className={styles["item-icon"]}>
        <Icon />
      </span>
      <span className={styles["item-text"]}>{category.title.en}</span>
    </Link>
  );
};

const Sidebar = async () => {
  const categories = await Api.categories.getAll();

  if (!categories) return null;

  return (
    <div className={styles["sidebar"]}>
      <h3 className={styles["title"]}>Categories</h3>
      <ul className={styles["list"]}>
        {categories.map((c) => (
          <li className={styles["item"]} key={c.id}>
            <Item category={c} />
          </li>
        ))}
      </ul>

      <ul className={styles["nav"]}>
        <li>
          <Link href="/">home</Link>
        </li>
        <li>
          <Link href="/catalog">Catalog</Link>
        </li>
        <li>
          <Link href="/admin">admin</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
