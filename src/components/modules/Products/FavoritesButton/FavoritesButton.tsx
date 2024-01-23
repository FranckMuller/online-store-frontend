"use client";

import { useFavorites } from "@/hooks/products/useFavorites";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import * as Api from "@/api";

import styles from "./FavoritesButton.module.scss";

type Props = {
  productId: string;
  isFavorite: boolean;
};

const FavoritesButton = ({ productId, isFavorite }: Props) => {
  const { toggleFavorites } = useFavorites();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleFavorites(productId);
  };

  return (
    <button className={styles["favorites-button"]} onClick={handleClick}>
      {!isFavorite ? <FaRegHeart /> : <FaHeart />}
    </button>
  );
};

export default FavoritesButton;
