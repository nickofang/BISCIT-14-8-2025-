import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';  
import { SalesOrdersPage } from './sales-orders/sales-orders.page';


//lazy loading for the login page and action page

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },

  { path: 'customer-info', loadChildren: () => import('./customer-info/customer-info.module').then(m => m.CustomerInfoPageModule), canActivate: [MsalGuard] },

  { path: 'action', loadChildren: () => import('./action/action.module').then(m => m.ActionPageModule), canActivate: [MsalGuard] },

  { path: 'book-delivery', loadChildren: () => import('./book-delivery/book-delivery.module').then(m => m.BookDeliveryPageModule) },

  { path: 'sales-orders', loadChildren: () => import('./sales-orders/sales-orders.module').then(m => m.SalesOrdersPageModule), canActivate: [MsalGuard] },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)], // so important for routing, app knows how to handle routing
  exports: [RouterModule] //Makes routing available to other parts of the app

})
export class AppRoutingModule {}// Defines the routing module

