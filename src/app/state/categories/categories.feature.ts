import { products } from './../../constants/fake-products';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductCategory } from './../../models/product';
import { CategoriesActions } from './categories.actions';

export interface CategoriesState {
  categories: ProductCategory[];
  selectedCategory: ProductCategory | null;
  loading: boolean;
  error: unknown | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  selectedCategory: null,
  error: null,
};

export const categoriesFeature = createFeature({
  name: 'categories',
  reducer: createReducer(
    initialState,

    //LOADING RELATED ACTIONS
    on(CategoriesActions.loadCategories, (state) => ({
      ...state,
      loading: true,
    })),
    on(CategoriesActions.loadCategoriesSuccess, (state, { categories }) => ({
      ...state,
      loading: false,
      selectedCategory: null,
      products,
    })),
    on(CategoriesActions.loadCategoriesError, (state, { error }) => ({
      ...state,
      loading: false,
      selectedCategory: null,
      error,
    })),
    
  ),
});

export const {
  name,
  reducer,
  selectCategories,
  selectCategoriesState,
  selectError,
  selectLoading,
  selectSelectedCategory,
} = categoriesFeature;
