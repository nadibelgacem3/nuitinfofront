import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { ITiersLocation } from '../../shared/models/base/tiers-location.model';
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {IArticle} from "../../shared/models/base/article";

type EntityResponseType = HttpResponse<ITiersLocation>;
type EntityArrayResponseType = HttpResponse<ITiersLocation[]>;
type EntityArrayResponseTypeAdd = HttpResponse<any[]>;
@Injectable({
  providedIn: 'root'
})
export class LocationCompanyService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/company-locations';
    public resourceUrl_1 = SERVER_API_URL + 'api/governments';
    public resourceUrl_2 = SERVER_API_URL + 'api/delegations';
    public resourceUrl_3 = SERVER_API_URL + 'api/pays';
  constructor(protected http: HttpClient) {}


    query_Governments(req?: any): Observable<EntityArrayResponseTypeAdd> {
        const options = createRequestOption(req);
        return this.http.get<any[]>(this.resourceUrl_1, { params: options, observe: 'response' }).pipe(
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

    query_pays(req?: any): Observable<EntityArrayResponseTypeAdd> {
        const options = createRequestOption(req);
        return this.http.get<any[]>(this.resourceUrl_3, { params: options, observe: 'response' }).pipe(
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

    query_Delegations(req?: any): Observable<EntityArrayResponseTypeAdd> {
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

  create(tiersLocation: ITiersLocation): Observable<EntityResponseType> {
    return this.http.post<ITiersLocation>(this.resourceUrl, tiersLocation, { observe: 'response' }).pipe(
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

  update(tiersLocation: ITiersLocation): Observable<EntityResponseType> {
    return this.http.put<ITiersLocation>(this.resourceUrl, tiersLocation, { observe: 'response' }).pipe(
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
    return this.http.get<ITiersLocation>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
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
    return this.http.get<ITiersLocation[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(
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
