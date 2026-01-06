import { ResolveFn } from '@angular/router';
import { Product } from '../../models/product';
import { inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';

export const productsResolver: ResolveFn<Product> = (route, state) => {
  const productService = inject(ProductsService);
  const productId = Number(route.queryParamMap.get('id'));
  return productService.fetchProductById(productId);
};
