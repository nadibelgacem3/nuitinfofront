import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {map} from "rxjs/internal/operators";
import * as moment from "moment";


type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable({
  providedIn: 'root'
})
export class ReglementsService {
  public resourceUrl_2 = SERVER_API_URL + 'company-service/api/reglements';
  constructor(protected http: HttpClient) {}

  create(company: any): Observable<EntityResponseType> {
    return this.http.post<any>(this.resourceUrl_2, company, { observe: 'response' }).pipe(
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

  update(company: any): Observable<EntityResponseType> {
    return this.http.put<any>(this.resourceUrl_2, company, { observe: 'response' });
  }

    statTreasury(treasury: any): Observable<any> {
        return this.http.post<any>(`${this.resourceUrl_2}/statTreasury`, treasury, {observe: 'response'}).pipe(
            // tslint:disable-next-line:no-shadowed-variable
            map((response => response.body)),
        );
    }

    balanceCustomers(treasury: any): Observable<any> {
        return this.http.post<any>(`${this.resourceUrl_2}/balance-customers`, treasury);
    }

    balanceSuppliers(treasury: any): Observable<any> {
        return this.http.post<any>(`${this.resourceUrl_2}/balance-suppliers`, treasury);
    }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<any>(`${this.resourceUrl_2}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(this.resourceUrl_2, { params: options, observe: 'response' });
  }

    validCheckOrTraitDebit(reglement: any): Observable<EntityResponseType> {
        return this.http.post<any>(`${this.resourceUrl_2}/validCheckOrTraitDebit`, reglement , { observe: 'response' });
    }

    convertToNotPaid(reglement: any): Observable<EntityResponseType> {
        return this.http.post<any>(`${this.resourceUrl_2}/convertToNotPaid`, reglement , { observe: 'response' });
    }

    convertToPaid(reglement: any): Observable<EntityResponseType> {
        return this.http.post<any>(`${this.resourceUrl_2}/convertToPaid`, reglement , { observe: 'response' });
    }

    filtredReglements(): Observable<EntityArrayResponseType> {
        return this.http.get<any[]>(`${this.resourceUrl_2}/filtredReglements`, { observe: 'response' })
    }


  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl_2}/${id}`, { observe: 'response' });
  }


  reglementsList(reglementsList: any[]) {
    return this.http.post<any>(`${this.resourceUrl_2}/reglementsList`, reglementsList, { observe: 'response' }).pipe(
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
