import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import {SubscriptionRenewal} from "../../shared/models/base/subscription-renewal";
import Swal from "sweetalert2";


type EntityResponseType = HttpResponse<SubscriptionRenewal>;
type EntityArrayResponseType = HttpResponse<SubscriptionRenewal[]>;

@Injectable({
  providedIn: 'root'
})
export class SubscriptionRenewalServiceService {
  public resourceUrl = SERVER_API_URL + 'api/subscription-renewals';
  public resourceUrl_2 = SERVER_API_URL + 'api/transaction-banks';
  // public resourceUrl_3 = SERVER_API_URL + 'api/changeStatusTransactionBank';
  // public resourceUrl_4 = SERVER_API_URL + 'api/checkStatusTransactionBank';
  constructor(protected http: HttpClient) {}

  create(annualSubscriptionPlan: SubscriptionRenewal): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(annualSubscriptionPlan);
    return this.http
        .post<SubscriptionRenewal>(this.resourceUrl, annualSubscriptionPlan, { observe: 'response' }).pipe(
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

  update(annualSubscriptionPlan: SubscriptionRenewal): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(annualSubscriptionPlan);
    return this.http
        .put<SubscriptionRenewal>(this.resourceUrl, copy, { observe: 'response' })
        .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  lastReference() {
    return this.http
        .get(`${this.resourceUrl}/lastReference`, { observe: 'response' });
  }
   getUrlClickToPay(amount): any {
    return this.http
        .get(`${this.resourceUrl_2}/cardPayment/${amount}`, { observe: 'response' });
  }
  changeStatusTransactionBank(id): any {
    return this.http
        .get(`${this.resourceUrl_2}/changeStatusTransactionBank/${id}`, { observe: 'response' });
  }
  checkStatusTransactionBank(id): any {
    return this.http
        .get(`${this.resourceUrl_2}/checkStatusTransactionBank/${id}`);
  }
  find(id: number): Observable<EntityResponseType> {
    return this.http
        .get<SubscriptionRenewal>(`${this.resourceUrl}/${id}`, { observe: 'response' })
        .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  subscriptionRenewalVerified(id: string): Observable<EntityResponseType> {
    return this.http
        .get<SubscriptionRenewal>(`${this.resourceUrl}/subscriptionRenewalVerified/${id}`, { observe: 'response' })
        .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
        .get<SubscriptionRenewal[]>(this.resourceUrl, { params: options, observe: 'response' })
        .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(annualSubscriptionPlan: SubscriptionRenewal): SubscriptionRenewal {
    const copy: SubscriptionRenewal = Object.assign({}, annualSubscriptionPlan, {
      startDate:
          annualSubscriptionPlan.startDate && annualSubscriptionPlan.startDate.isValid()
              ? annualSubscriptionPlan.startDate.toJSON()
              : undefined,
      endDate:
          annualSubscriptionPlan.endDate && annualSubscriptionPlan.endDate.isValid() ?
              annualSubscriptionPlan.endDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate ? moment(res.body.startDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((annualSubscriptionPlan: SubscriptionRenewal) => {
        annualSubscriptionPlan.startDate = annualSubscriptionPlan.startDate ?
            moment(annualSubscriptionPlan.startDate) : undefined;
        annualSubscriptionPlan.endDate = annualSubscriptionPlan.endDate ?
            moment(annualSubscriptionPlan.endDate) : undefined;
      });
    }
    return res;
  }

  checkDemoExists(id) {
    return this.http.get(`${this.resourceUrl}/checkDemoOfCompany/${id}`);
  }
}
