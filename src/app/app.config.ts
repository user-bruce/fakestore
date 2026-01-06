import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { AppErrorHandler } from './app-error-handler';
import { provideClientHydration } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { provideState, provideStore } from '@ngrx/store';
import { productsFeature } from './state/products/products.feature';
import { cartReducer } from './state/cart/cart.reducers';
import { categoriesFeature } from './state/categories/categories.feature';
import { provideEffects } from '@ngrx/effects';
import { ProductCategoriesEffect } from './state/categories/categories.effects';
import { ProductsEffect } from './state/products/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(withFetch()),
    providePrimeNG({
      theme: {
        preset: Lara,
      },
      ripple: true,
    }),
    { provide: ErrorHandler, useClass: AppErrorHandler },
    provideClientHydration(),
    provideStore(),
    provideState({ name: 'cart', reducer: cartReducer }),
    provideState(productsFeature),
    provideState(categoriesFeature),
    provideEffects(ProductCategoriesEffect, ProductsEffect),
  ],
};
