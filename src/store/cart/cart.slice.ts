import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  ICartProduct,
  ICartProducts
} from "@/interfaces/products.interface";

type TCartItems = Array<{
  product: ICartProduct;
  quantity: number;
}>;

type State = {
  items: TCartItems;
  amount: number;
  paymentUrl: string;
};

const initialState: State = {
  items: [],
  amount: 0,
  paymentUrl: '#'
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleProductCart: (state, { payload }: PayloadAction<ICartProduct>) => {
      const idx = state.items.findIndex(i => i.product.id === payload.id);
      if (idx === -1) {
        state.items.push({ product: { ...payload }, quantity: 1 });
        state.amount = state.amount + +payload.price;
      } else {
        state.items.splice(idx, 1);
        state.amount = state.amount - +payload.price;
      }
    },

    incrementProductCart: (
      state,
      { payload }: PayloadAction<{ id: string }>
    ) => {
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].product.id === payload.id) {
          state.items[i].quantity++;
          state.amount += +state.items[i].product.price;
          break;
        }
      }
    },

    decrementProductCart: (
      state,
      { payload }: PayloadAction<{ id: string }>
    ) => {
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].product.id === payload.id) {
          if (state.items[i].quantity === 1) {
            break;
          }
          state.items[i].quantity--;
          state.amount -= +state.items[i].product.price;
          break;
        }
      }
    },

    setPaymentUrl: (
      state,
      { payload }: PayloadAction<{ paymentUrl: string }>
    ) => {
      state.paymentUrl = payload.paymentUrl;
    }
  }
});

export const {
  toggleProductCart,
  incrementProductCart,
  decrementProductCart,
  setPaymentUrl
} = cartSlice.actions;

export default cartSlice.reducer;
