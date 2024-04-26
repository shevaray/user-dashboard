import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, tap, toArray } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  cacheMap = new Map<string, HttpResponse<any>>();
  cachableUrls: any[] = [];

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRequestCachable(request)) {
      return next.handle(request);
    }else {
      return this.cacheRequest(request, next)
    }
  }

  isRequestCachable(req: HttpRequest<any>): boolean{
    if (req.method === 'GET') {
      this.getParams()
      const urls = this.cachableUrls;

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

  getParams() {
    const url = environment.apiBaseUrl + this.router.url.slice(1,)
    if (
        this.cachableUrls.includes(url) ||
        this.router.url.includes('/users?') ||
        this.router.url.endsWith('/users')
      ) {
      return;
    }
    this.cachableUrls.push(url)
  }
}
