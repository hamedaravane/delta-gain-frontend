import {inject, Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LayoutFacade} from "@layout/layout.facade";
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable()
export class OmpAuthInterceptor implements HttpInterceptor {
  private readonly layoutFacade = inject(LayoutFacade);
  private readonly nzMessage = inject(NzMessageService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.layoutFacade.ompfinexAuthTokenLocalStorage;
    if (!authToken) {
      this.nzMessage.error("You are not logged in");
    }
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    if (req.url.includes("api.ompfinex.com")) {
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
