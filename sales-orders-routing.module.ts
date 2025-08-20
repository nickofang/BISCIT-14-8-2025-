import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesOrdersPage } from './sales-orders.page';

const routes: Routes = [
  {
    path: '',
    component: SalesOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesOrdersPageRoutingModule {}
