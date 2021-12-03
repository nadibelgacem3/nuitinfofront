import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {SERVER_API_URL, SERVER_API_URL_2} from '../../../app.constants';
import {CompanyUser, ISchema} from './user';
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";


@Injectable({
    providedIn: 'root'
})


export class RegisterService {
    constructor(private http: HttpClient) {
    }

    save(account: CompanyUser): Observable<{}> {
        return this.http.post(SERVER_API_URL + 'api/register', account);
    }
    checkSchemaEshop(): any {
        return this.http.get(SERVER_API_URL + 'api/eshop-schema/checkSchemaEshop');
    }

    saveUser(account: CompanyUser): Observable<{}> {
        return this.http.post(SERVER_API_URL + 'api/registerSimpleUser', account);
    }

    saveISchema(schema: ISchema): Observable<{}> {
        return this.http.post(SERVER_API_URL + 'company-service/api/createSchema', schema);
    }
    saveISchemaEshop(): Observable<{}> {
        return this.http.get(SERVER_API_URL_2 + 'eshop/api/createSchema');
    }

    // getBusinessTypes(): any[] {
    //     return this.http.get<any[]>(SERVER_API_URL + 'api/company-type-configs');
    // }

    getBusinessTypes(lang): any {
        return this.http.get<any>(`${SERVER_API_URL}api/company-type-configs/lang/${lang}`, { observe: 'response' });
    }

    activation(login: string, code: string) {
        return this.http.get<boolean>(`${SERVER_API_URL}api/twilio-classes/compare/${login}/${code}`, { observe: 'response' });
    }

    // sendCode(code: any): Observable<{}> {
    //     return this.http.post(`${SERVER_API_URL}api/verifyPhoneIdentity`, code);
    // }

    sendCode( item: any): Observable<any> {
        return this.http.post<any>(`${SERVER_API_URL}api/verifyPhoneIdentity`,  item,
            { observe: 'response' }).pipe(
            catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: "the operation couldn't be completed.",
                });
                return throwError(e);
            })
        );
    }

    checkEmailExists(email: string) {
        return this.http.get(`${SERVER_API_URL}api/users/checkEmail?email=${email}`);
    }
}
