import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from './services/loading.service';
var pendingRequests = 0
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.showLoading()
    pendingRequests++
    return next.handle(request)
      .pipe(
        tap({
          next:(event) => {
            //proveravamo da li je rikvest zavrsen
            if(event.type === HttpEventType.Response){
              this.handleHideLoading()
            }
          },
          error: (_) => {
            this.handleHideLoading()
          }
        })
      )
  }

  handleHideLoading() {
    pendingRequests--
    this.loadingService.hideLoading()
    // if(pendingRequests === 0){
      
    // }
  }
}
