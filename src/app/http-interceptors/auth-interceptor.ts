import {inject, Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd/message';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly nzMessage = inject(NzMessageService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');

    let authReq = req;
    if (token) {
      authReq = req.clone({
        reportProgress: true,
        headers: req.headers.append('Authorization', `Bearer ${token}`),
        withCredentials: true,
      });
    } else {
      this.nzMessage.error('You are not authenticated');
    }
    return next.handle(authReq);
  }
}
