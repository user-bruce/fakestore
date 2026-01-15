import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductCategory } from '../../models/product';

export const CategoriesActions = createActionGroup({
  source: 'Product Categories',
  events: {
    loadCategories: emptyProps(),
    loadCategoriesSuccess: props<{ categories: ProductCategory[] }>(),
    loadCategoriesError: props<{ error: unknown }>(),

    createCategory: props<{ category: ProductCategory }>(),
    createCategorySuccess: props<{ category: ProductCategory }>(),
    createCategoryError: props<{ error: unknown }>(),

    updateCategory: props<{
      id: number;
      changes: Partial<ProductCategory>;
    }>(),
    updateCategorySuccess: props<{ category: ProductCategory }>(),
    updateCategoryError: props<{ error: unknown }>(),

    deleteCategory: props<{ id: number }>(),
    deleteCategorySuccess: props<{ id: number }>(),
    deleteCategoryError: props<{ error: unknown }>(),
  },
});

const {
  loadCategories,
  loadCategoriesSuccess,
  loadCategoriesError,
  createCategory,
  createCategorySuccess,
  createCategoryError,
  updateCategory,
  updateCategorySuccess,
  updateCategoryError,
  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryError,
} = CategoriesActions;
