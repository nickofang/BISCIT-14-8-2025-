import { Component } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { ModalController } from '@ionic/angular';
import { BookDeliveryPage } from 'src/app/book-delivery/book-delivery.page';
import { ActionService } from './action.service';

// Define interface for order row
interface OrderRow {
  orderId: string;
  orderDate: string;
  lines: number;
  orderedBy: string;
  status: string;
  selected?: boolean;
}

@Component({
  selector: 'app-action',
  standalone: false,
  templateUrl: './action.page.html',
  styleUrls: ['./action.page.scss'],
})
export class ActionPage {
  private gridApi!: GridApi<OrderRow>; // typed gridApi for OrderRow

  columnDefs: ColDef[] = [
    {
      headerName: 'Select',
      field: 'selected',
      width: 80,
      cellRenderer: this.checkboxCellRenderer,
      headerCheckboxSelection: false,
      checkboxSelection: false
    },
    { headerName: 'Order #', field: 'orderId' },
    { headerName: 'Order Date', field: 'orderDate' },
    { headerName: 'Lines', field: 'lines' },
    { headerName: 'Ordered By', field: 'orderedBy' },
    { headerName: 'Status', field: 'status' }
  ];

  defaultColDef = {
    sortable: true,
    filter: true
  };

  rowData: OrderRow[] = []; // initialize empty array with type

  modules = [ClientSideRowModelModule];

  constructor(
    private modalCtrl: ModalController,
    private actionService: ActionService
  ) {}

onGridReady(params: any) {
    this.gridApi = params.api;
    this.loadOrders();
  }

  loadOrders() {
    this.actionService.getSalesOrders().subscribe({
      next: orders => this.rowData = [...orders],
      error: err => console.error('Failed to fetch orders:', err)
    });
  }

  checkboxCellRenderer(params: any) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = params.value;
    checkbox.addEventListener('change', (event) => {
      const checked = (event.target as HTMLInputElement).checked;
      params.node.setDataValue('selected', checked);
      params.node.setSelected(checked);
    });
    return checkbox;
  }

  async openBookingModal() {
    const selectedRows = this.rowData.filter(row => row.selected && row.status === 'Ready');
    if (!selectedRows.length) return console.log('No orders selected');

    const modal = await this.modalCtrl.create({
      component: BookDeliveryPage,
      componentProps: { selectedOrders: selectedRows }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data?.bookedOrders) {
      this.loadOrders(); // Refresh grid to show updated status
    }
  }
}