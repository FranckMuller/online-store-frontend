import type {RootState} from '../store'

export const selectCartItems = (state: RootState) => state.cart.items
export const selectCartAmount = (state: RootState) => state.cart.amount
export const selectCart = (state: RootState) => state.cart