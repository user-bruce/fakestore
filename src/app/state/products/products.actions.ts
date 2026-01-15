import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../models/product';

export const ProductsActions = createActionGroup({
  source: 'Products Page',
  events: {
    //List products
    loadProducts: emptyProps(),
    loadProductsSuccess: props<{ products: Product[] }>(),
    loadProductsFailure: props<{ error: unknown }>(),

    //Load a single Product
    loadProduct: props<{ id: number }>(),
    loadProductSuccess: props<{ product: Product }>(),
    loadProductFailure: props<{ error: unknown }>(),

    //Search for a single product
    searchProducts: props<{ query: string }>(),
    searchProductsSuccess: props<{ products: Product[] }>(),
    searchProductsFailure: props<{ error: unknown }>(),

    //Filter products by category
    filterProductsByCategory: props<{ category: string }>(),
    filterProductsByCategorySuccess: props<{ products: Product[] }>(),
    filterProductsByCategoryFailure: props<{ error: unknown }>(),

    //Create a product
    createProduct: props<{ product: Product }>(),
    createProductSuccess: props<{ product: Product }>(),
    createProductFailure: props<{ error: unknown }>(),

    //Update a single product
    updateProduct: props<{ id: number; changes: Partial<Product> }>(),
    updateProductSuccess: props<{ product: Product }>(),
    updateProductFailure: props<{ error: unknown }>(),

    //Delete a single product
    deleteProduct: props<{ id: number }>(),
    deleteProductSuccess: props<{ id: number }>(),
    deleteProductFailure: props<{ error: unknown }>(),
  },
});

const {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
  loadProduct,
  loadProductSuccess,
  loadProductFailure,
  createProduct,
  createProductSuccess,
  createProductFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
  searchProducts,
  searchProductsSuccess,
  searchProductsFailure,
  filterProductsByCategory,
  filterProductsByCategorySuccess,
  filterProductsByCategoryFailure,
}=ProductsActions;
