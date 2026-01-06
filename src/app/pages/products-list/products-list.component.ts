import { Component, inject, signal } from '@angular/core';
import { ProductCardComponent } from '../../common/product-card/product-card.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { CategoriesComponent } from '../../common/categories/categories.component';
import { RippleModule } from 'primeng/ripple';
import { RouterLink, Router } from '@angular/router';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { ShoppingCartProduct } from '../../models/shopping-cart';
import { selectCart } from '../../state/cart/cart.selectors';
import { CartActions } from '../../state/cart/cart.actions';
import { ProductsActions } from '../../state/products/products.actions';
import { selectLoading, selectProducts } from '../../state/products/products.feature';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CarouselModule,
    ButtonModule,
    ToastModule,
    SkeletonModule,
    ProgressSpinnerModule,
    CommonModule,
    CardModule,
    CurrencyPipe,
    RippleModule,
    CategoriesComponent,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
  providers: [ProductsService, MessageService],
})
export class ProductsListComponent {
  router = inject(Router);

  store = inject(Store);
  products$ = this.store.select(selectProducts);
  productsLoading$ = this.store.select(selectLoading);

  messageService = inject(MessageService);

  loading = signal<boolean>(false);
  cartProducts$ = this.store.select(selectCart);


  ngOnInit() {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  onProductsLoaded(event: any) {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  onSearchFlagChanged(event: any) {
    this.loading.set(event);
  }

  viewProductClicked(id: number) {
    this.router.navigate(['/detail', id]);
  }

  addToCart(event: Event, prod: Product) {
    event.stopPropagation();
    const product: ShoppingCartProduct = {
      quantity: 1,
      product: prod,
    };
    this.store.dispatch(CartActions.addItem({ product }));
    this.showSuccessToast('Product added to cart');
    this.cartProducts$.subscribe((items) => {
      console.log(items);
    });
  }

  showSuccessToast(message: string) {
    this.messageService.add({
      detail: message,
      severity: 'success',
      summary: 'Success',
    });
  }

  showErrorToast(message: string) {
    this.messageService.add({
      detail: message,
      severity: 'danger',
      summary: 'Error',
    });
  }
}
