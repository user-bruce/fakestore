import { createReducer, on } from '@ngrx/store';
import { CartActions } from './cart.actions';
import { ShoppingCartProduct } from '../../models/shopping-cart';

export const initialState: ReadonlyArray<ShoppingCartProduct> = [];

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addItem, (state, { product }) => {
    return [...state, product];
  }),
  on(CartActions.removeItem, (state, { item }) => {
    return state.filter((p) => p.product.title !== item);
  }),
  on(CartActions.changeQuantity, (state, { item, count }) => {
    const product = state.find(
      (p) => p.product.title === item
    ) as ShoppingCartProduct;
    product.quantity = count;
    return [...state];
  })
);
