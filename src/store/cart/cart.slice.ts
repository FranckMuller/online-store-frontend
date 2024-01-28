import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  ICartProduct,
  ICartProducts
} from "@/interfaces/products.interface";

type State = {
  products: ICartProducts;
  productsCount: number;
  totalPrice: number;
};

const initialState: State = {
  products: [],
  productsCount: 0,
  totalPrice: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleProductCart: (state, { payload }: PayloadAction<ICartProduct>) => {
      const idx = state.products.findIndex(p => p.id === payload.id);
      if (idx === -1) {
        state.products.push(payload);
        state.totalPrice = state.totalPrice + +payload.price;
      } else {
        state.products.splice(idx, 1);
        state.totalPrice = state.totalPrice - +payload.price;
      }
    },

    incrementProductCart: (
      state,
      { payload }: PayloadAction<{ id: string }>
    ) => {
      for (let i = 0; i < state.products.length; i++) {
        if (state.products[i].id === payload.id) {
          state.products[i].count++;
          state.totalPrice += +state.products[i].price;
          break;
        }
      }
    },

    decrementProductCart: (
      state,
      { payload }: PayloadAction<{ id: string }>
    ) => {
      for (let i = 0; i < state.products.length; i++) {
        if (state.products[i].id === payload.id) {
          if (state.products[i].count === 1) {
            break;
          }
          state.products[i].count--;
          state.totalPrice -= +state.products[i].price;
          break;
        }
      }
    }
  }
});

export const { toggleProductCart, incrementProductCart, decrementProductCart } =
  cartSlice.actions;

export default cartSlice.reducer;
