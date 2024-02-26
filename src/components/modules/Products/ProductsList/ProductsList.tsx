"use client";
import { useMe } from "@/hooks/auth/useMe";
import { useFavorites } from "@/hooks/products/useFavorites";
import { useAddProduct } from "@/hooks/cart/useAddProduct";
import { useFetchCart } from "@/hooks/cart/useFetchCart";
import { useRemoveCartItem } from "@/hooks/cart/useRemoveCartItem";

import ProductItem from "../ProductItem/ProductItem";

import type { IProducts, IProduct } from "@/interfaces/products.interface";

import styles from "./ProductsList.module.scss";

type Props = {
  products: IProducts;
  columnCount?: "1" | "2" | "3" | "4";
};

const ProductsList = ({ products, columnCount = "4" }: Props) => {
  const { favoritesProductsIdx } = useFavorites();
  const { isAuthed } = useMe();
  const addProduct = useAddProduct();
  const fetchCart = useFetchCart();
  const removeCartItem = useRemoveCartItem();

  let columnCountClassName = `col-${columnCount}`;

  const cartProductsIds = fetchCart?.cart?.items
    ? fetchCart?.cart?.items.map(i => i.product.id)
    : [];

  const toggleProduct = (productId: string) => {
    const isInCart = cartProductsIds?.includes(productId);
    if (!isInCart) {
      addProduct.add({ productId, quantity: 1 });
    } else {
      const existedCartItem = fetchCart?.cart?.items.find(
        i => i.product.id === productId
      );
      if (existedCartItem) {
        removeCartItem.remove(existedCartItem.id);
      }
    }
  };

  return (
    <div
      className={`${styles["products-list"]} ${styles[columnCountClassName]}`}
    >
      {products.length ? (
        products.map(p => {
          const isFavorite = favoritesProductsIdx?.includes(p.id);
          const isInCart = cartProductsIds?.includes(p.id);
          return (
            <div key={p.id} className={styles["item"]}>
              <ProductItem
                isFavorite={!!isFavorite}
                isInCart={!!isInCart}
                isShowedControls={isAuthed}
                product={p}
                toggleProductCart={toggleProduct}
              />
            </div>
          );
        })
      ) : (
        <p>Products not found</p>
      )}
    </div>
  );
};

export default ProductsList;
