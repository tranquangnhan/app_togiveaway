import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatablogsService } from './datablogs.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private datablog: DatablogsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loggedInUser = this.datablog.currentUserValue;
    var token = loggedInUser.jwt;
    if (token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }


    return next.handle(request);
  }
}
