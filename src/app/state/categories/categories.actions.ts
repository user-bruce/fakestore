import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductCategory } from '../../models/product';

export const CategoriesActions = createActionGroup({
  source: 'Product Categories',
  events: {
    'Load Categories': emptyProps(),
    'Load Categories Success': props<{ categories: ProductCategory[] }>(),
    'Load Categories Error': props<{ error: unknown }>(),

    'Create Category': props<{ category: ProductCategory }>(),
    'Create Category Success': props<{ category: ProductCategory }>(),
    'Create Category Error': props<{ error: unknown }>(),

    'Update Category': props<{
      id: number;
      changes: Partial<ProductCategory>;
    }>(),
    'Update Category Success': props<{ category: ProductCategory }>(),
    'Update Category Error': props<{ error: unknown }>(),

    'Delete Category': props<{ id: number }>(),
    'Delete Category Success': props<{ id: number }>(),
    'Delete Category Error': props<{ error: unknown }>(),
  },
});
