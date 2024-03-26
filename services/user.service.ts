import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiSvc: ApiService) { }

  login(body) : Observable<any>{
    return this.apiSvc.post(`${environment.link}/users/login`,body)
  }

  register(body) : Observable<any>{
    return this.apiSvc.post(`${environment.link}/users/register`,body)
  }

  logout(body) : Observable<any>{
    return this.apiSvc.post(`${environment.link}/users/logout`,body)
  }

  getUserById() : Observable<any>{
    return this.apiSvc.get(`${environment.link}/users`)
  }

  editUser(body) : Observable<any>{
    return this.apiSvc.put(`${environment.link}/users`,body)
  }
}
