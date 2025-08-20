import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // for *ngFor, ngIf
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // for ion-header, ion-content, etc.

import { ActionService, Order } from '../action/action.service';

@Component({
  selector: 'app-sales-orders',
  standalone: true,  // important
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './sales-orders.page.html',
  styleUrls: ['./sales-orders.page.scss'],
})
export class SalesOrdersPage implements OnInit {
  orders: Order[] = [];

  constructor(private actionService: ActionService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.actionService.getSalesOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  doRefresh(event: any) {
    console.log('Refreshing orders...');
    this.loadOrders();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
