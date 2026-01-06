import { Product } from './product';

export interface ShoppingCart {
  items: ShoppingCartProduct[];
}

export interface ShoppingCartProduct {
  product: Product;
  quantity: number;
}
