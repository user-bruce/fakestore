import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../../services/products.service';
import { CategoriesActions } from './categories.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

export const ProductCategoriesEffect = {
  loadProductCategories: createEffect(
    (actions$ = inject(Actions), categoriesService = inject(ProductsService)) =>
      actions$.pipe(
        ofType(CategoriesActions.loadCategories),
        mergeMap(() =>
          categoriesService.fetchProductCategories().pipe(
            map((categories) =>
              CategoriesActions.loadCategoriesSuccess({ categories })
            ),
            catchError((error) =>
              of(CategoriesActions.loadCategoriesError({ error }))
            )
          )
        )
      ),
    { functional: true }
  ),
};
