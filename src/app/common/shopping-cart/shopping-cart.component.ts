import { CommonModule } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { DataViewModule } from 'primeng/dataview';
import { ShoppingCartProduct } from '../../models/shopping-cart';
import { SelectModule } from 'primeng/select';
import { Store } from '@ngrx/store';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    SelectModule,
    DividerModule,
    DrawerModule,
    InputNumberModule,
    AvatarModule,
    DataViewModule,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent {
  visible = input<boolean>(false);
  
  closeCart = output()

  store  = inject(Store);
  products$ = this.store.select('cart');

  ngOnInit() {
    this.products$.subscribe((state)=>{
      console.log(state)
    })
  }

  hideShoppingCart() {}

  closeCartClicked(){
    this.closeCart.emit();
  }
}
