import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliverypartnerService {

  constructor(private apiSvc: ApiService) { }

  addDeliveryPartner(body): Observable<any>{
    return this.apiSvc.post(`${environment.link}/deliverypartner/add`,body)
  }

  getAllDeliveryPartners(): Observable<any>{
    return this.apiSvc.get(`${environment.link}/deliverypartner`)
  }

  assignOrderToDeliveryPartner(body): Observable<any>{
    return this.apiSvc.post(`${environment.link}/deliverypartner/assign`,body)
  }
}
