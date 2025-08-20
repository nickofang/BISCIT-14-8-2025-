import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesOrdersPage } from './sales-orders.page'; // Standalone component

const routes: Routes = [
  {
    path: '',
    component: SalesOrdersPage
  }
];

@NgModule({
  imports: [
    SalesOrdersPage,        // ✅ Import the standalone component
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SalesOrdersPageModule {}
