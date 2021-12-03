import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";

import {SERVER_API_URL} from "../../app.constants";
import {Observable, throwError} from "rxjs";
import {createRequestOption} from "../../shared/util/request-util";

import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";

type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;
@Injectable({
  providedIn: 'root'
})
export class VariantConfigService {
  public resourceUrl = SERVER_API_URL + 'api/variant-configs';
    public resourceUrl_2 = SERVER_API_URL + 'company-service/api/variants';
    public resourceUrl_3 = SERVER_API_URL + 'api/variant-value-configs';
  constructor(protected http: HttpClient) {}

  create(tva: any): Observable<EntityResponseType> {
    return this.http.post<any>(this.resourceUrl, tva, { observe: 'response' }).pipe(
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

  update(tva: any): Observable<EntityResponseType> {
    return this.http.put<any>(this.resourceUrl, tva, { observe: 'response' }).pipe(
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

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<any>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
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

    findLang(): Observable<EntityResponseType> {
        return this.http.get<any>(`${this.resourceUrl}/lang`, { observe: 'response' }).pipe(
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
    findLangValue(): Observable<EntityResponseType> {
        return this.http.get<any>(`${this.resourceUrl_3}/lang`, { observe: 'response' }).pipe(
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

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(
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

    queryVariants(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<any[]>(this.resourceUrl_2, { params: options, observe: 'response' }).pipe(
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

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
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
