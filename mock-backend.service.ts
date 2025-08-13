import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

export interface Order {
  orderId: string;
  orderDate: string;
  lines: number;
  orderedBy: string;
  status: string;
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
    return { orders };
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
}
