import { useAppSelector } from "../useAppSelector";
import { useAppDispatch } from "../useAppDispatch";
import {
  toggleProductCart,
  incrementProductCart,
  decrementProductCart
} from "@/store/cart/cart.slice";
import {
  selectCartProducts,
  selectTotalPrice
} from "@/store/cart/cart.selectors";

import type { ICartProduct } from "@/interfaces/products.interface";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectCartProducts);
  const totalPrice = useAppSelector(selectTotalPrice);

  const toggleProduct = (product: ICartProduct) => {
    dispatch(toggleProductCart(product));
  };

  const incrementProduct = (id: string) => {
    dispatch(incrementProductCart({id}));
  };
  
  const decrementProduct = (id: string) => {
    dispatch(decrementProductCart({id}));
  };

  const cartProductsIds = products.length > 0 ? products.map(p => p.id) : [];

  return {
    products,
    toggleProduct,
    cartProductsIds,
    totalPrice,
    incrementProduct,
    decrementProduct
  };
};
