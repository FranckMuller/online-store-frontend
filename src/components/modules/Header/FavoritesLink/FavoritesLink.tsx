"use client";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";

import { useFavorites } from "@/hooks/products/useFavorites";

import styles from "./FavoritesLink.module.scss";

const FavoritesLink = () => {
  const { favoritesTotalCount } = useFavorites();

  return (
    <Link className={styles["link"]} href="/favorites">
      <FaRegHeart />
      {favoritesTotalCount > 0 &&<span className={styles["count"]}>
        { favoritesTotalCount}
      </span>}
    </Link>
  );
};

export default FavoritesLink;
