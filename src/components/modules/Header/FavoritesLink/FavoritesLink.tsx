"use client";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";

import { useFavorites } from "@/hooks/products/useFavorites";

import styles from "./FavoritesLink.module.scss";

const FavoritesLink = () => {
  const { favoritesTotalCount } = useFavorites();

  return (
    <Link className={styles["link"]} href="/profile/favorites">
      <CiHeart />
      {favoritesTotalCount > 0 &&<span className={styles["count"]}>
        { favoritesTotalCount}
      </span>}
    </Link>
  );
};

export default FavoritesLink;
