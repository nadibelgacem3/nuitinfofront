import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HardcodedAuthenticationService {

  constructor() {
  }

  // tslint:disable-next-line:typedef
  authenticate(email, password) {
    if (email === 'admin@gmail.com' && password === 'admin') {
      sessionStorage.setItem('authenticaterUser', email);
      return true;
    }
    return false;
  }

  // tslint:disable-next-line:typedef
  isUserLoggedIn() {
    const user = sessionStorage.getItem('authenticaterUser');
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem('authenticaterUser');
  }
}
