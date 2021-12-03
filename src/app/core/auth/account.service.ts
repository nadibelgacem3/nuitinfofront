import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {Observable, ReplaySubject, of} from 'rxjs';
import {shareReplay, tap, catchError} from 'rxjs/operators';
import {StateStorageService} from '../../core/auth/state-storage.service';

import {SERVER_API_URL} from '../../app.constants';
import {Account} from '../../core/user/account.model';

@Injectable({providedIn: 'root'})
export class AccountService {
    private userIdentity: Account | null = null;
    private authenticationState = new ReplaySubject<Account | null>(1);
    private accountCache$?: Observable<Account | null>;

    constructor(
        private http: HttpClient,
        private stateStorageService: StateStorageService,
        private router: Router,
    ) {
    }

    save(account: any): Observable<{}> {
        return this.http.post(SERVER_API_URL + 'api/account', account);
    }

    resetPassword(mail: string): Observable<{}> {
        return this.http.post(SERVER_API_URL + 'api/account/reset-password/init', mail);
    }

    authenticate(identity: Account | null): void {
        this.userIdentity = identity;
        this.authenticationState.next(this.userIdentity);
    }

    hasAnyAuthority(authorities: string[] | string): boolean {

        if (!this.userIdentity || !this.userIdentity.authorities) {
            return false;
        }
        if (!Array.isArray(authorities)) {
            authorities = [authorities];
        }
        this.identity().subscribe(account => {
            if (account) {
                return account.authorities.some((authority: string) => authorities.includes(authority));
            }

        });

    }

    identity(force?: boolean): Observable<Account | null> {
        if (!this.accountCache$ || force || !this.isAuthenticated()) {
            this.accountCache$ = this.fetch().pipe(
                catchError(() => {
                    return of(null);
                }),
                tap((account: Account | null) => {
                    this.authenticate(account);

                    // After retrieve the account info, the language will be changed to
                    // the user's preferred language configured in the account setting
                    if (account && account.langKey) {
                        const langKey = localStorage.getItem('lang') || account.langKey;
                        // this.languageService.changeLanguage(langKey);
                    }

                    if (account) {
                        this.navigateToStoredUrl();
                    }
                }),
                shareReplay(),
            );
        }
        return this.accountCache$;
    }

    getCategories(id): any {
        return this.http.get<any>(`${SERVER_API_URL}api/activity-configs/category/lang/${id}`, { observe: 'response' });
    }

    getMarks(id): any {
        return this.http.get<any>(`${SERVER_API_URL}api/activity-configs/mark/lang/${id}`, { observe: 'response' });
    }

    isAuthenticated(): boolean {
        return this.userIdentity !== null;
    }

    getAuthenticationState(): Observable<Account | null> {
        return this.authenticationState.asObservable();
    }

    getImageUrl(): string {
        return this.userIdentity ? this.userIdentity.imageUrl : '';
    }

    private fetch(): Observable<Account> {
        return this.http.get<Account>(SERVER_API_URL + 'api/account');
    }

    private navigateToStoredUrl(): void {
        // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
        // if login is successful, go to stored previousState and clear previousState
        const previousUrl = this.stateStorageService.getUrl();
        if (previousUrl) {
            this.stateStorageService.clearUrl();
            this.router.navigateByUrl(previousUrl);
        }
    }
}
