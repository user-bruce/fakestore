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

    //Load all categories
    on(CategoriesActions.loadCategories, (state) => ({
      ...state,
      loading: true,
    })),

    //Load categories success
    on(CategoriesActions.loadCategoriesSuccess, (state, { categories }) => ({
      ...state,
      loading: false,
      selectedCategory: null,
      products,
    }))
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
