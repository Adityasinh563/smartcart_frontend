import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private apiSvc:ApiService) { }

  createOrder(body) : Observable<any>{
    return this.apiSvc.post(`${environment.link}/orders/createOrder`,body)
  }

  getOrders(): Observable<any>{
    return this.apiSvc.get(`${environment.link}/admin/orders`)
  }

  getOrdersByUser(): Observable<any>{
    return this.apiSvc.get(`${environment.link}/orders/getOrder`)
  }

  getOrderByOrderId(orderId: string): Observable<any>{
    return this.apiSvc.get(`${environment.link}/orders/getOrderByOrderId?orderId=${orderId}`)
  }

  updateOrder(body): Observable<any>{
    return this.apiSvc.put(`${environment.link}/orders/updateOrder`,body)
  }
}
