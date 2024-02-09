"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

  const { mutate: createOrder } = useMutation({
    mutationFn: (data: Array<IOrderData>) => Api.orders.createOrder(data),
    onSuccess: data => {
      console.log(data);
      dispatch(setPaymentUrl(data));
      router.push("/profile/checkout");
    }
  });

  const toggleProduct = (product: ICartProduct) => {
    dispatch(toggleProductCart(product));
  };

  const incrementProduct = (id: string) => {
    dispatch(incrementProductCart({ id }));
  };

  const decrementProduct = (id: string) => {
    dispatch(decrementProductCart({ id }));
  };

  const onOrderCreate = () => {
    if (cart.items.length) {
      const data = cart.items.map(i => ({
        quantity: i.quantity,
        product: i.product.id
      }));

      createOrder(data);
    }
  };

  const cartProductsIds =
    cart.items.length > 0 ? cart.items.map(i => i.product.id) : [];

  return {
    items: cart.items,
    paymentUrl: cart.paymentUrl,
    amount: cart.amount,
    toggleProduct,
    cartProductsIds,
    incrementProduct,
    decrementProduct,
    onOrderCreate
  };
};
