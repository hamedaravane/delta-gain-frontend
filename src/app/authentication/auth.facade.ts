import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthFacade {
  private readonly authTokenSubmitLoadingSubject = new Subject<boolean>();
  private readonly isAuthTokenAvailableSubject = new Subject<boolean>();

  get isAuthTokenAvailable$() {
    return this.isAuthTokenAvailableSubject.asObservable()
  };

  get authTokenSubmitLoading$() {
    return this.authTokenSubmitLoadingSubject.asObservable()
  };

  setToken(token: string) {
    this.authTokenSubmitLoadingSubject.next(true);
    this.saveAuthTokenToLocalStorage(token);
    this.authTokenSubmitLoadingSubject.next(false);
    this.isAuthTokenAvailableSubject.next(false);
  }

  readTokenFromLocalStorage() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.isAuthTokenAvailableSubject.next(true);
    }
  }

  private saveAuthTokenToLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  removeAuthTokenFromLocalStorage() {
    localStorage.removeItem('token');
  }
}
