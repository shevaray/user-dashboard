import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CachableUrls } from '../config/cachable-urls.config';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  cacheMap = new Map<string, HttpResponse<any>>();

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRequestCachable(request)) {
      return next.handle(request);
    }else {
      return this.cacheRequest(request, next)
    }
  }

  isRequestCachable(req: HttpRequest<any>): boolean{
    if (req.method === 'GET') {
      const urls = CachableUrls;

      for (let i = 0; i < urls.length; i++) {
        if (req.url.toLowerCase() === urls[i].toLowerCase()) {
          return true;
        }

      }
    }

    return false;
  }

  cacheRequest(req: HttpRequest<any>, next: HttpHandler) {
    const url = req.url.toLowerCase();

    if (this.cacheMap.has(url)) {
      return of(this.cacheMap.get(url) as HttpResponse<any>)
    }else {
      return next.handle(req).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.cacheMap.set(url, event)
          }
        })
      )
    }
  }
}
