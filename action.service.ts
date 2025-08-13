import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  orderId: string;
  orderDate: string;
  lines: number;
  orderedBy: string;
  status: string;
}



@Injectable({
  providedIn: 'root'
})
export class ActionService {
  // Use relative path (mock backend catches this!)
  private apiUrl = 'api/orders';

  constructor(private http: HttpClient) {}

  getSalesOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
  
  //  Update a single order's status
  updateOrderStatus(orderId: string, status: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}`, { status });
  }
}
