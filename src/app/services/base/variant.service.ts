import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";

import {SERVER_API_URL} from "../../app.constants";
import {Observable, throwError} from "rxjs";
import {createRequestOption} from "../../shared/util/request-util";
import {ITVA} from "../../shared/models/base/tva";
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {IVariant} from "../../shared/models/base/variant";

type EntityResponseType = HttpResponse<IVariant>;
type EntityArrayResponseType = HttpResponse<IVariant[]>;

@Injectable({
  providedIn: 'root'
})
export class VariantService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/variant-configs';
    public resourceUrl_2 = SERVER_API_URL + 'company-service/api/variant-value-configs';
  constructor(protected http: HttpClient) {}

  create(tva: IVariant): Observable<EntityResponseType> {
    return this.http.post<IVariant>(this.resourceUrl, tva, { observe: 'response' }).pipe(
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

  update(tva: IVariant): Observable<EntityResponseType> {
    return this.http.put<IVariant>(this.resourceUrl, tva, { observe: 'response' }).pipe(
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
    return this.http.get<IVariant>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
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
    return this.http.get<IVariant[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(
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

    queryValuesVariants(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVariant[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(
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

  delete(id: string): Observable<HttpResponse<{}>> {
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
    deleteValue(id: string): any {
        return this.http.delete(`${this.resourceUrl_2}/${id}`);
    }

    checkName(name: string) {
        return this.http.get(`${this.resourceUrl}/nameConfigTranslated/${name}`);
    }
}
