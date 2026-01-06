import { createFeatureSelector } from "@ngrx/store";
import { ShoppingCartProduct } from "../../models/shopping-cart";

export const selectCart = createFeatureSelector<ReadonlyArray<ShoppingCartProduct>>("cart");

