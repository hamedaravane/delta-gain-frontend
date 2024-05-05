import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {NoopInterceptor} from "./noop-interceptor";
import {OmpAuthInterceptor} from "./omp-auth-interceptor";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: OmpAuthInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
];
