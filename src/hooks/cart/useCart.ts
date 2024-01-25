import { useAppSelector } from "../useAppSelector";
import { useAppDispatch } from "../useAppDispatch";
import { toggleProductCart } from "@/store/cart/cart.slice";
import { selectCartProducts } from "@/store/cart/cart.selectors";

import type { ICartProduct } from "@/interfaces/products.interface";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectCartProducts);

  const toggleProduct = (product: ICartProduct) => {
    dispatch(toggleProductCart(product));
  };

  const cartProductsIds = products.length > 0 ? products.map(p => p.id) : [];

  return { products, toggleProduct, cartProductsIds };
};
