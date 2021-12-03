import {Injectable, isDevMode} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';


import {AuthfakeauthenticationService} from '../services/authfake.service';

import {environment} from '../../../environments/environment';
import {Observable} from "rxjs";
import {AccountService} from "../auth/account.service";
import {map} from "rxjs/internal/operators";
import {StateStorageService} from "../auth/state-storage.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService,
        private stateStorageService: StateStorageService,
        private authFackservice: AuthfakeauthenticationService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        /*if (environment.defaultauth === 'firebase') {
            const currentUser = this.authenticationService.currentUser();
            if (currentUser) {
                // logged in so return true
                return true;
            }
        } else {*/
        const authorities = route.data['authorities'];
        const currentUser = this.authFackservice.currentUserValue;
        if (currentUser && this.checkLogin(authorities, state.url)) {
            // this.router.navigate(['/dashboard']);
            this.accountService.identity().subscribe(account => {
                if (account) {
                    // for (let i = 0; i < authorities.length; i++) {
                    //     if (authorities[i]) {
                    //         for (let j = 0; j < account.authorities.length; j++) {
                    //             if (!account.authorities[j] === authorities[i]) {
                    //                 this.router.navigate(['../pages/404']);
                    //             }
                    //         }
                    //     }
                    //
                    // }
                    // if (authorities.length > 1) {
                    const hasAnyAuthority = account.authorities.some( authority => authorities.includes(authority));
                    if (!hasAnyAuthority) {
                        this.router.navigate(['../pages/404']);
                    }
                     // }

                }
            });
            // logged in so return true
            return true;
        } else {
            this.authFackservice.logout();
            this.router.navigate(['/account/login'], {queryParams: {returnUrl: state.url}});
            return false;
        }
        if (localStorage.getItem('authenticationToken') === '') {
            this.authFackservice.logout();
            this.router.navigate(['/account/login'], {queryParams: {returnUrl: state.url}});
        }

        // }
        // not logged in so redirect to login page with the return url

    }

    checkLogin(authorities: string[], url: string): Observable<boolean> {
        return this.accountService.identity().pipe(
            map(account => {
                if (!authorities || authorities.length === 0) {
                    return true;
                }
                if (account) {
                    if (!Array.isArray(authorities)) {
                        authorities = [authorities];
                    }
                    const hasAnyAuthority = this.accountService.hasAnyAuthority(authorities);
                    if (hasAnyAuthority) {
                        return true;
                    }
                    if (isDevMode()) {
                        console.error('User has not any of required authorities: ', authorities);
                    }

                    this.router.navigate(['../pages/500']);
                    return false;
                }

                this.stateStorageService.storeUrl(url);
                this.router.navigate(['']);
                return false;
            })
        );
    }
}
