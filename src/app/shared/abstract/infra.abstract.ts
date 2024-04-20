import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export abstract class InfraAbstract {
  protected readonly httpClient = inject(HttpClient);

  // protected abstract converter<SRC, DES>(input: SRC): DES;
}
