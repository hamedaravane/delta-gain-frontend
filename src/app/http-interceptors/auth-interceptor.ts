import {inject, Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly nzMessage = inject(NzMessageService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    // const ompAuthToken = localStorage.getItem('ompfinexAuthToken');
    if (!token) {
      this.nzMessage.error('You are not authenticated');
    }
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    /*const ompAuthReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${ompAuthToken}`).append('Content-Type', 'application/json'),
    });
    if (req.url.includes('api.ompfinex.com')) {
      return next.handle(ompAuthReq);
    }*/
    if (req.url.includes('152.228.152.64')) {
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
