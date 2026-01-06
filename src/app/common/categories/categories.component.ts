import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Output,
  output,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PriceFilterComponent } from '../price-filter/price-filter.component';
import { RippleModule } from 'primeng/ripple';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProductsService } from '../../services/products.service';
import { Product, ProductCategory } from '../../models/product';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { SliderModule } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    ChipModule,
    SkeletonModule,
    RippleModule,
    InputNumberModule,
    ProgressBarModule,
    DialogModule,
    FormsModule,
    SliderModule,
    ReactiveFormsModule,
    InputTextModule,
    AvatarModule,
    ButtonModule,
    MenuModule,
    PriceFilterComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  providers: [MessageService],
})
export class CategoriesComponent {
  categoriesService = inject(ProductsService);
  messageService = inject(MessageService);
  private searchSub?: Subscription;

  searchControl = new FormControl('');
  products!: Product[];
  @Output() emitProducts = new EventEmitter<Product[]>();
  @Output() emitSearchFlag = new EventEmitter<boolean>(false);

  productCategories = signal<ProductCategory[]>([]);
  filterDialogVisible = signal<boolean>(false);
  rangeValues: number[] = [10, 150];
  amount: number = 0;

  ngOnInit() {
    this.fetchProductCategories();
    this.fetchProducts();
    this.onSearchValueChanges();
  }

  fetchProductCategories() {
    this.categoriesService.fetchProductCategories().subscribe({
      next: (value) => {
        this.productCategories.set(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  formatAmount(value: any): string {
    const num = Number(value);
    if (isNaN(num)) return '$0.00';

    return '$' + num.toFixed(2);
  }

  showFilterDialog() {
    this.filterDialogVisible.set(true);
  }

  fetchProducts() {
    this.emitSearchFlag.emit(true);
    this.categoriesService.fetchProducts().subscribe({
      next: (value) => {
        this.products = value;
        this.emitProducts.emit(this.products);
        this.emitSearchFlag.emit(false);
      },
      error: (err) => {
        this.emitSearchFlag.emit(false);
      },
    });
  }

  onSearchValueChanges() {
    this.emitSearchFlag.emit(true);
    this.searchSub = this.searchControl.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((term) => {
          if (!term || term.trim().length <= 2)
            return this.categoriesService.fetchProducts();
          return this.categoriesService.filterProductsByTitle(term);
        })
      )
      .subscribe({
        next: (data) => {
          this.emitProducts.emit(data);
          this.emitSearchFlag.emit(false);
        },
        error: (err) => {
          this.emitSearchFlag.emit(false);
        },
      });
  }

  onCategoryClicked(cat: string) {
    this.categoriesService
      .filterProductsByCategory(cat.toLocaleLowerCase())
      .subscribe({
        next: (value) => {
          this.products = value;
          this.emitProducts.emit(this.products);
        },
        error: (err) => {
          console.log(err.message);
        },
      });
  }
}
