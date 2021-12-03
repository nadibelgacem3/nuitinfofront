import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { IPaymentSubscription } from '../../shared/models/base/payment-subscription.model';

type EntityResponseType = HttpResponse<IPaymentSubscription>;
type EntityArrayResponseType = HttpResponse<IPaymentSubscription[]>;

@Injectable({ providedIn: 'root' })
export class PaymentSubscriptionService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/payment-subscriptions';

  constructor(protected http: HttpClient) {}

  create(paymentSubscription: IPaymentSubscription): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paymentSubscription);
    return this.http
      .post<IPaymentSubscription>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(paymentSubscription: IPaymentSubscription): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(paymentSubscription);
    return this.http
      .put<IPaymentSubscription>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPaymentSubscription>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPaymentSubscription[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(paymentSubscription: IPaymentSubscription): IPaymentSubscription {
    const copy: IPaymentSubscription = Object.assign({}, paymentSubscription, {
      paymentDate:
        paymentSubscription.paymentDate && paymentSubscription.paymentDate.isValid() ?
            paymentSubscription.paymentDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.paymentDate = res.body.paymentDate ? moment(res.body.paymentDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((paymentSubscription: IPaymentSubscription) => {
        paymentSubscription.paymentDate = paymentSubscription.paymentDate ?
            moment(paymentSubscription.paymentDate) : undefined;
      });
    }
    return res;
  }
}
