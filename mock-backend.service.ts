import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

export interface Order {
  orderId: string;
  orderDate: string;
  lines: number;
  orderedBy: string;
  status: string;
  selected?: boolean;
}

export interface Customer {
  name: string;
  customerNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class MockBackendService implements InMemoryDbService {

  createDb() {
    const orders: Order[] = [
      { orderId: 'ORD-201', orderDate: '2025-05-15', lines: 5, orderedBy: 'Nicko Fang', status: 'Ready' },
      { orderId: 'ORD-223', orderDate: '2025-06-16', lines: 3, orderedBy: 'Daracon Water Works', status: 'Ready' },
      { orderId: 'ORD-224', orderDate: '2025-06-16', lines: 3, orderedBy: 'Walka Water Works', status: 'Ready' }
    ];

    const customers: Customer[] = [
      { name: 'Nicko Fang', customerNumber: 'CUST-001' },
      { name: 'Daracon Water Works', customerNumber: 'CUST-002' }
    ];

    // Mock logged-in user
    const currentUser = { name: 'Nicko Fang', customerNumber: 'CUST-001' };

    return { orders, customers, currentUser };
  }

  // Optional: intercept PUT requests to update order status
  put(reqInfo: RequestInfo): Observable<Response> {
    const collectionName = reqInfo.collectionName;
    if (collectionName === 'orders') {
      const orderId = reqInfo.id;
      const body = reqInfo.utils.getJsonBody(reqInfo.req) as Partial<Order>;
      const data = reqInfo.collection.find((o: Order) => o.orderId === orderId);
      if (data && body.status) {
        data.status = body.status;
      }
      const options: ResponseOptions = {
        body: data,
        status: STATUS.OK
      };
      return reqInfo.utils.createResponse$(() => options);
    }
    return undefined as any;
  }

  // Optional: intercept GET requests for current user
  get(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'currentUser') {
      const currentUser = { name: 'Nicko Fang', customerNumber: 'CUST-001' };
      const options: ResponseOptions = {
        body: currentUser,
        status: STATUS.OK
      };
      return reqInfo.utils.createResponse$(() => options);
    }

    return undefined; // fallback to default GET behavior
  }
}
