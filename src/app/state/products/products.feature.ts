import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product';
import { ProductsActions } from './products.actions';

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: unknown | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  selectedProduct: null,
  error: null,
};

export const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialState,


    // PRODUCTS LISTING ACTIONS
    on(ProductsActions.loadProducts, (state) => ({
      ...state,
      loading: true,
    })),

    on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
      ...state,
      loading: false,
      products,
    })),

    on(ProductsActions.loadProductsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),


    // LOAD SINGLE PRODUCT ACTIONS
    on(ProductsActions.loadProduct, (state) => ({
      ...state,
      loading: true,
    })),

    on(ProductsActions.loadProductSuccess, (state, { product }) => ({
      ...state,
      selectedProduct: product,
      loading: false,
    })),

    on(ProductsActions.loadProductFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),


    //SEARCH A SINGLE PRODUCT ACTION REDUCERS
    on(ProductsActions.searchProducts, (state) => ({
      ...state,
      loading: true,
    })),


    on(ProductsActions.searchProductsSuccess, (state, { products }) => ({
      ...state,
      loading: false,
      products,
    })),


    on(ProductsActions.searchProductsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),


    // CREATE A SINGLE PRODUCT ACTION REDUCERS
    on(ProductsActions.createProduct, (state, { product }) => ({
      ...state,
      products: [...state.products, product],
    })),


    // UPDATE A PRODUCT ACTION REDUCERS
    on(ProductsActions.updateProductSuccess, (state, { product }) => ({
      ...state,
      products: state.products.map((p) => (p.id === product.id ? product : p)),
    })),

    
    // DELETE A PRODUCT ACTION REDUCERS
    on(ProductsActions.deleteProductSuccess, (state, { id }) => ({
      ...state,
      products: state.products.filter((p) => {
        return p.id !== id;
      }),
    }))
  ),
});

//Selectors = name(feature name), reducer and selectors for each piece of data in the state
export const {
  name,
  reducer,
  selectProductsState,
  selectLoading,
  selectError,
  selectProducts,
  selectSelectedProduct,
} = productsFeature;
