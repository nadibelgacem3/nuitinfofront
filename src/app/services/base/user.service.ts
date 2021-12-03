import { Injectable } from '@angular/core';
import {SERVER_API_URL} from "../../app.constants";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {IUser} from "../../core/user/user.model";
import {Observable, throwError} from 'rxjs';
import {createRequestOption, Pagination} from "../../shared/util/request-util";
import {catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public resourceUrl = SERVER_API_URL + 'api/users';
    public resourceUrl_2 = SERVER_API_URL + 'api/twilio-classes';
  constructor(private http: HttpClient) {}

  create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.resourceUrl, user).pipe(
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

    updatePhone(id, oldPhone, newPhone) {
        return this.http.get<any>(`${this.resourceUrl}/updatePhone/${id}/${oldPhone}/${newPhone}`).pipe(
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

    updateEmail(newEmail) {
        return this.http.post<any>(`${this.resourceUrl}/updateEmail`, newEmail).pipe(
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

    compareUpdatePhone(email, code, phone) {
        return this.http.get<any>(`${this.resourceUrl_2}/compareUpdatePhone/${email}/${code}/${phone}`).pipe(
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


    compareUpdateEmail(oldEmail) {
        return this.http.post<any>(`${this.resourceUrl_2}/compareUpdateEmail`, oldEmail).pipe(
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



  update(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.resourceUrl, user).pipe(
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

  find(login: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.resourceUrl}/${login}`);
  }

  activate(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.resourceUrl}/activate/${id}`).pipe(
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
  desactivate(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.resourceUrl}/desactivate/${id}`).pipe(
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

  query(): Observable<HttpResponse<IUser[]>> {
    return this.http.get<IUser[]>(`${this.resourceUrl}`, {  observe: 'response' }).pipe(
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

  delete(login: string): Observable<{}> {
    return this.http.delete(`${this.resourceUrl}/${login}`).pipe(
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
}
