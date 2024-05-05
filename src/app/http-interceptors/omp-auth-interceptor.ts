import { inject, Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class OmpAuthInterceptor implements HttpInterceptor {
  private readonly nzMessage = inject(NzMessageService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('ompfinexAuthToken');
    if (!authToken) {
      this.nzMessage.error('You are not logged in');
    }
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`).append('Content-Type', 'application/json'),
    });
    if (req.url.includes('api.ompfinex.com')) {
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
