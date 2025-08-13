import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionService } from '../action/action.service'; // ✅ import the service
import { Order } from '../action/action.service'; // Optional: for type safety

@Component({
  selector: 'app-book-delivery',
  standalone: true,
  templateUrl: './book-delivery.page.html',
  styleUrls: ['./book-delivery.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule] 
})
export class BookDeliveryPage {
  @Input() selectedOrders: Order[] = []; // ✅ using type from ActionService

  selectedDate: string = ''; // User-selected delivery date
  selectedTime: string = ''; // User-selected delivery time
  minDate = new Date().toISOString(); // Minimum date = today in ISO format

  constructor(
    private modalCtrl: ModalController,
    private actionService: ActionService // injectable in confirmBooking()
  ) {}

 confirmBooking() {
    const updates = this.selectedOrders.map(order =>
      this.actionService.updateOrderStatus(order.orderId, 'Processing').toPromise()
    );

    Promise.all(updates).then(() => {
      this.modalCtrl.dismiss({
        bookedOrders: this.selectedOrders,
        date: this.selectedDate,
        time: this.selectedTime
      });
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}