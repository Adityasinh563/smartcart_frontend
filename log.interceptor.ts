import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class LogInterceptor implements HttpInterceptor {

    constructor(private router:Router,private toastrSvc: ToastrService){
        
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if(error.status == 401){
                this.toastrSvc.error('Session Timed Out')
                this.router.navigate(['/'])
            }
          return throwError(error);
          })
        );
      }
}