import type {RootState} from '../store'

export const selectCartProducts = (state: RootState) => state.cart.products
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice