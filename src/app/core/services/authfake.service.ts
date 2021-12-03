import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../models/auth.models';
import {SERVER_API_URL} from '../../app.constants';


@Injectable({providedIn: 'root'})

export class AuthfakeauthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,
               ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(login: any) {
        /*return this.http.post<any>(`/users/authenticate`, { email, password })*/
        return this.http.post<any>(SERVER_API_URL + 'api/authenticate', login)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.id_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));

                    this.currentUserSubject.next(user);
                    if (login.rememberMe) {
                       localStorage.setItem('authenticationToken', user.id_token);
                    } else {
                        sessionStorage.setItem('authenticationToken', user.id_token);
                    }

                    // setInterval(() => {
                    //     // window.location.href = 'http://192.168.1.21:4300/dashboard?token' + user.id_token  ;
                    //     window.location.href = 'http://192.168.1.21:4300/pages/coming-soon/' + user.id_token;
                    // }, 2000);

                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        // localStorage.clear();
        // sessionStorage.clear();
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
