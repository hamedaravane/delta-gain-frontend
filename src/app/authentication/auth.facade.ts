import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthFacade {
  private readonly ompfinexAuthTokenSubmitLoadingSubject = new Subject<boolean>();
  private readonly isAuthTokenAvailableSubject = new Subject<boolean>();
  isAuthTokenAvailable$ = this.isAuthTokenAvailableSubject.asObservable();
  ompfinexAuthTokenSubmitLoading$ = this.ompfinexAuthTokenSubmitLoadingSubject.asObservable();

  setOmpfinexAuthToken(token: string) {
    this.ompfinexAuthTokenSubmitLoadingSubject.next(true);
    this.saveOmpfinexAuthTokenToLocalStorage(token);
    this.ompfinexAuthTokenSubmitLoadingSubject.next(false);
    this.isAuthTokenAvailableSubject.next(false);
  }

  readTokenFromLocalStorage() {
    const token = localStorage.getItem('ompfinexAuthToken');
    if (!token) {
      this.isAuthTokenAvailableSubject.next(true);
    }
  }

  private saveOmpfinexAuthTokenToLocalStorage(token: string) {
    localStorage.setItem('ompfinexAuthToken', token);
  }

  removeOmpfinexAuthTokenFromLocalStorage() {
    localStorage.removeItem('ompfinexAuthToken');
  }
}