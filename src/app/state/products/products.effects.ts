import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { ProductsActions } from './products.actions';
import { catchError, map, mergeMap } from 'rxjs';
import { ProductsService } from '../../services/products.service';

export const ProductsEffect = {
  loadProductsEffect: createEffect(
    (actions$ = inject(Actions), productsService = inject(ProductsService)) =>
      actions$.pipe(
        ofType(ProductsActions.loadProducts),
        mergeMap(() =>
          productsService
            .fetchProducts()
            .pipe(
              map((products) =>
                ProductsActions.loadProductsSuccess({ products })
              )
            )
        ),
        catchError((error) => of(ProductsActions.loadProductFailure({ error })))
      ),
    { functional: true }
  ),

  loadSingleProductEffect: createEffect(
    (actions$ = inject(Actions), productsService = inject(ProductsService)) =>
      actions$.pipe(
        ofType(ProductsActions.loadProduct),
        mergeMap(({ id }) =>
          productsService.fetchProductById(id).pipe(
            map((product) => ProductsActions.loadProductSuccess({ product })),
            catchError((error) =>
              of(ProductsActions.loadProductFailure({ error }))
            )
          )
        )
      ),
    { functional: true }
  ),
};
