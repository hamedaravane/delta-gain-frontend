import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {NoopInterceptor} from "./noop-interceptor";
import {AuthInterceptor} from "./auth-interceptor";
import {LoggingInterceptor} from "./logging-interceptor";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
];
