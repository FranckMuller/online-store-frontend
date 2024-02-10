"use client";

import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "../useAppSelector";
import { useAppDispatch } from "../useAppDispatch";

import * as Api from "@/api";

import {
  toggleProductCart,
  incrementProductCart,
  decrementProductCart,
  setPaymentUrl
} from "@/store/cart/cart.slice";
import { selectCart } from "@/store/cart/cart.selectors";

import type { ICartProduct } from "@/interfaces/products.interface";
import type { IOrderData } from "@/interfaces/orders.interface";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

  const toggleProduct = (product: ICartProduct) => {
    dispatch(toggleProductCart(product));
  };

  const incrementProduct = (id: string) => {
    dispatch(incrementProductCart({ id }));
  };

  const decrementProduct = (id: string) => {
    dispatch(decrementProductCart({ id }));
  };

  const cartProductsIds =
    cart.items.length > 0 ? cart.items.map(i => i.product.id) : [];

  return {
    items: cart.items,
    amount: cart.amount,
    toggleProduct,
    cartProductsIds,
    incrementProduct,
    decrementProduct
  };
};
