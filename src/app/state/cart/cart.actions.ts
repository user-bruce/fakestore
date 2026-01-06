import { createActionGroup, props } from '@ngrx/store';
import { ShoppingCartProduct } from '../../models/shopping-cart';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add Item': props<{ product: ShoppingCartProduct }>(),
    'Remove Item': props<{ item: string }>(),
    'Change Quantity': props<{ item: string; count: number }>(),
  },
});
