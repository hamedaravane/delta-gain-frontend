import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LayoutFacade {
  ompfinexAuthTokenLocalStorage: string | null = null;
  private readonly ompfinexAuthTokenSubject = new Subject<string | null>();
  ompfinexAuthToken$ = this.ompfinexAuthTokenSubject.asObservable();
  private readonly ompfinexAuthTokenSubmitLoadingSubject = new Subject<boolean>();
  ompfinexAuthTokenSubmitLoading$ = this.ompfinexAuthTokenSubmitLoadingSubject.asObservable();

  setOmpfinexAuthToken(token: string) {
    this.ompfinexAuthTokenSubmitLoadingSubject.next(true);
    this.ompfinexAuthTokenSubject.next(token);
    this.saveOmpfinexAuthTokenToLocalStorage(token);
    this.ompfinexAuthTokenSubmitLoadingSubject.next(false);
  }

  readTokenFromLocalStorage() {
    this.ompfinexAuthTokenLocalStorage = localStorage.getItem('ompfinexAuthToken');
    this.ompfinexAuthTokenSubject.next(this.ompfinexAuthTokenLocalStorage);
  }

  private saveOmpfinexAuthTokenToLocalStorage(token: string) {
    localStorage.setItem('ompfinexAuthToken', token);
  }

  removeOmpfinexAuthTokenFromLocalStorage() {
    localStorage.removeItem('ompfinexAuthToken');
  }
}
