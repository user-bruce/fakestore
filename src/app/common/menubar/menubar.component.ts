import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngrx/store';
import { Ripple } from 'primeng/ripple';
import { DrawerModule } from 'primeng/drawer';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { RouterLink } from '@angular/router';
import { ShoppingCartComponent } from "../shopping-cart/shopping-cart.component";
import { selectCart } from '../../state/cart/cart.selectors';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    BadgeModule,
    DrawerModule,
    ButtonModule,
    MenuModule,
    DividerModule,
    OverlayBadgeModule,
    AvatarModule,
    InputTextModule,
    Ripple,
    RouterLink,
    ShoppingCartComponent
],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css',
})
export class MenubarComponent {
  items: MenuItem[] | undefined;
  visible = signal<boolean>(false);
  store = inject(Store)

  cartItems$ = this.store.select(selectCart);

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        route: '/',
      },
    ];
  }

  openCart() {
    this.visible.set(!this.visible());
  }
}
