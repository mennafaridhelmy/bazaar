import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent },
  { path: 'item/:id', component: ItemDetailsComponent },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'top'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
