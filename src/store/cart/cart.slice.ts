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
      const idx = state.products.findIndex((p) => payload.id)
      if(idx === -1) {
      state.products.push(payload);
      } else {
        state.products.splice(idx, 1)
      }
    }
  }
});

export const { toggleProductCart } = cartSlice.actions;

export default cartSlice.reducer;
