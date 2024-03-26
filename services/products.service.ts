import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { ApiService } from './api.service'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiSvc: ApiService) { }

  addProduct(body) : Observable<any>{
    return this.apiSvc.post(`${environment.link}/admin/addProduct`,body)
  }

  getProducts() : Observable<any>{
    return this.apiSvc.get(`${environment.link}/products`)
  }

  getProductById(productId) : Observable<any>{
    return this.apiSvc.get(`${environment.link}/products/${productId}`)
  }
}
