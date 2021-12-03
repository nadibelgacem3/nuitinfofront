import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {CacheControlService} from "./cache-control.service";
import {tap} from "rxjs/operators";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cachecontrolService: CacheControlService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const CSHResponse = this.cachecontrolService.getUrl(req.url);

    if (req.method !== 'GET') {
      this.cachecontrolService.errorCache();
      return next.handle(req);
    }

    if (CSHResponse) {
      return of (CSHResponse);
    }

    return next.handle(req).pipe(tap((event) => {
      if (event instanceof HttpResponse) {
        this.cachecontrolService.bringInUrl(req.url, event);
      }
    }));
  }
}
