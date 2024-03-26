import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(url : any){
    return this.http.get(url,{withCredentials : true})
  }

  post(url : any,body: any){
    return this.http.post(url,body,{withCredentials : true})
  }

  put(url: any,body:any){
    return this.http.put(url,body,{withCredentials: true})
  }
}
