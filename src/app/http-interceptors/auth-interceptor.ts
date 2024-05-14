import { inject, Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly nzMessage = inject(NzMessageService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('ompfinexAuthToken');
    if (!authToken) {
      this.nzMessage.error('You are not logged in');
    }
    const ompAuthReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`).append('Content-Type', 'application/json'),
    });
    const coinmarketcapAuthReq = req.clone({
      headers: req.headers.set('X-CMC_PRO_API_KEY', '962454d5-6afb-4cc0-b13e-5b0cbc5be8ee'),
    });
    if (req.url.includes('api.ompfinex.com')) {
      return next.handle(ompAuthReq);
    }
    if (req.url.includes('coinmarketcap.com')) {
      return next.handle(coinmarketcapAuthReq);
    }
    return next.handle(req);
  }
}
