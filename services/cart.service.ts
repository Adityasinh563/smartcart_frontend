import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private apiSvc: ApiService) { }

  addToCart(body): Observable<any> {
    return this.apiSvc.post(`${environment.link}/cart/addToCart`,body);
  }

  getCart(): Observable<any> {
    return this.apiSvc.get(`${environment.link}/cart/getCart`);
  }

  removeCart(body): Observable<any> {
    return this.apiSvc.post(`${environment.link}/cart/removeCart`,body)
  }
}
