import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { PopoverModule } from 'primeng/popover';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageService } from 'primeng/api';
import { Ripple } from "primeng/ripple";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CardModule, CommonModule, ButtonModule,DatePipe, PopoverModule, ToastModule, SkeletonModule, Ripple],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  providers: [ProductsService,MessageService],
})
export class ProductDetailComponent {
  router = inject(Router);
  id = input<string>('');

  productImageUrl = signal<string>('');
  productService = inject(ProductsService);
  messageService = inject(MessageService);

  product = signal<Product | undefined>(undefined);

  ngOnInit() {
    this.fetchProductById();
  }

  fetchProductById() {
    this.productService.fetchProductById(parseInt(this.id()!)).subscribe({
      next: (value) => {
        this.product.set(value);
        this.productImageUrl.set(this.product()?.images[0]!);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(){
    this.showSuccessToast('Product added to cart')
  }

  backClicked() {
    this.router.navigate(['/']);
  }

  thumbnailClicked(url: string) {
    this.productImageUrl.set(url);
  }

  showSuccessToast(message: string){
    this.messageService.add({
      detail: message,
      severity: 'success',
      summary: 'Success'
    })
  }

  showErrorToast(message: string){
    this.messageService.add({
      detail: message,
      severity: 'danger',
      summary: 'Error'
    })
  }
}
