import { Product, ProductCategory } from './../models/product';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = `${environment.apiUrl}/products`;
  httpClient = inject(HttpClient);

  fetchProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}`);
  }

  fetchProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(
      `${environment.apiUrl}/categories`
    );
  }

  filterProductsByTitle(title: string): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseUrl}/?title=${title}`)
  }

  filterProductsByCategory(category: string): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseUrl}/?categorySlug=${category}`)
  }

  fetchProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/${id}`);
  }
}
