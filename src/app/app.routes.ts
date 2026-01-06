import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { productsResolver } from './common/resolvers/products.resolver';

export const routes: Routes = [
    {
        path:'',
        component: ProductsListComponent
    },
    {
        path: 'detail/:id',
        component: ProductDetailComponent,
        
    }
];
