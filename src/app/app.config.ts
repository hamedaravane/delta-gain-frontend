import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {en_US, provideNzI18n} from 'ng-zorro-antd/i18n';
import {httpInterceptorProviders} from "./http-interceptors";
import {provideLottieOptions} from "ngx-lottie";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideNzI18n(en_US),
    importProvidersFrom(HttpClientModule),
    httpInterceptorProviders,
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
  ]
};
