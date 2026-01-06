import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../models/product';

export const ProductsActions = createActionGroup({
  source: 'Products Page',
  events: {
    //List products
    'Load Products': emptyProps(),
    'Load Products Success': props<{ products: Product[] }>(),
    'Load Products Failure': props<{ error: unknown }>(),

    //Load a single Product
    'Load Product': props<{ id: number }>(),
    'Load Product Success': props<{ product: Product }>(),
    'Load Product Failure': props<{ error: unknown }>(),

    //Create a product
    'Create Product': props<{ product: Product }>(),
    'Create Product Success': props<{ product: Product }>(),
    'Create Product Failure': props<{ error: unknown }>(),

    //Update a single product
    'Update Product': props<{ id: number; changes: Partial<Product> }>(),
    'Update Product Success': props<{ product: Product }>(),
    'Update Product Failure': props<{ error: unknown }>(),

    //Delete a single product
    'Delete Product': props<{ id: number }>(),
    'Delete Product Success': props<{ id: number }>(),
    'Delete Product Failure': props<{ error: unknown }>(),
  },
});
