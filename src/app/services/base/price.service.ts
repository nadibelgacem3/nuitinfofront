import { Injectable } from '@angular/core';
import {SERVER_API_URL} from "../../app.constants";
import {HttpClient, HttpResponse} from "@angular/common/http";

import {Observable, throwError} from "rxjs";
import {createRequestOption} from "../../shared/util/request-util";
import {IPrice} from "../../shared/models/base/price";
type EntityResponseType = HttpResponse<IPrice>;
type EntityArrayResponseType = HttpResponse<IPrice[]>;
import Swal from 'sweetalert2';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/price-categories';

  constructor(protected http: HttpClient) {}

  create(price: IPrice): Observable<EntityResponseType> {
    return this.http.post<IPrice>(this.resourceUrl, price, { observe: 'response' }).pipe(
        catchError(e => {
          Swal.fire({
           icon: 'info',
             title: 'Network Error',
            text: 'Something went wrong!' ,
          });
          return throwError(e);
        })
    );

  }

  update(price: IPrice): Observable<EntityResponseType> {
    return this.http.put<IPrice>(this.resourceUrl, price, { observe: 'response' }).pipe(
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
    return this.http.get<IPrice>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
        catchError(e => {
          Swal.fire({
           icon: 'info',
             title: 'Network Error',
            text: 'Something went wrong!' ,
          });
          return throwError(e);
        })
    );
  }

    maxMinPriceCategory(): any {
        return this.http.get<IPrice>(`${this.resourceUrl}/maxMinPriceCategory`, { observe: 'response' }).pipe(
            catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'Something went wrong!' ,
                });
                return throwError(e);
            })
        );
    }

  findByName(name: string): Observable<EntityResponseType> {
    return this.http.get<IPrice>(`${this.resourceUrl}/name/${name}`, { observe: 'response' });
  }
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPrice[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(
        catchError(e => {
          Swal.fire({
           icon: 'info',
             title: 'Network Error',
            text: 'Something went wrong!' ,
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
            text: 'Something went wrong!' ,
          });
          return throwError(e);
        })
    );
  }
}
