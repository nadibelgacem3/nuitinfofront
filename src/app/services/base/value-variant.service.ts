import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";

import {SERVER_API_URL} from "../../app.constants";
import {Observable, throwError} from "rxjs";
import {createRequestOption} from "../../shared/util/request-util";

import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {ValueVariant} from "../../shared/models/base/value-variant";

type EntityResponseType = HttpResponse<ValueVariant>;
type EntityArrayResponseType = HttpResponse<ValueVariant[]>;

@Injectable({
  providedIn: 'root'
})
export class ValueVariantService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/variant-values';

  constructor(protected http: HttpClient) {}

  create(tva: ValueVariant): Observable<EntityResponseType> {
    return this.http.post<ValueVariant>(this.resourceUrl, tva, { observe: 'response' }).pipe(
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

  update(tva: ValueVariant): Observable<EntityResponseType> {
    return this.http.put<ValueVariant>(this.resourceUrl, tva, { observe: 'response' }).pipe(
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
    return this.http.get<ValueVariant>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
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
    return this.http.get<ValueVariant[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(
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
