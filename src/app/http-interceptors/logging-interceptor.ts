import { finalize, tap } from 'rxjs';
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;

    return next.handle(req)
      .pipe(
        tap({
          error: (_error) => {
            if (_error.status === 0) {
              console.error('Request was interrupted. Possible CORS issue?');
            }
            return ok = 'failed'
          }
        }),
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
          console.info(msg);
        })
      );
  }
}
