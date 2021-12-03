import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { IInvoiceSubscriptionPlan } from '../../shared/models/base/invoice-subscription-plan.model';
import Swal from "sweetalert2";

type EntityResponseType = HttpResponse<IInvoiceSubscriptionPlan>;
type EntityArrayResponseType = HttpResponse<IInvoiceSubscriptionPlan[]>;

@Injectable({ providedIn: 'root' })
export class InvoiceSubscriptionPlanService {
  public resourceUrl = SERVER_API_URL + 'api/invoice-subscription-plans';

  constructor(protected http: HttpClient) {}

  create(invoiceSubscriptionPlan: IInvoiceSubscriptionPlan): Observable<EntityResponseType> {
    return this.http
      .post<IInvoiceSubscriptionPlan>(this.resourceUrl, invoiceSubscriptionPlan, { observe: 'response' }).pipe(
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

  update(invoiceSubscriptionPlan: IInvoiceSubscriptionPlan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(invoiceSubscriptionPlan);
    return this.http
      .put<IInvoiceSubscriptionPlan>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInvoiceSubscriptionPlan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInvoiceSubscriptionPlan[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(invoiceSubscriptionPlan: IInvoiceSubscriptionPlan): IInvoiceSubscriptionPlan {
    const copy: IInvoiceSubscriptionPlan = Object.assign({}, invoiceSubscriptionPlan, {
      date: invoiceSubscriptionPlan.date && invoiceSubscriptionPlan.date.isValid() ?
          invoiceSubscriptionPlan.date.toJSON() : undefined,
      dueDate:
        invoiceSubscriptionPlan.dueDate && invoiceSubscriptionPlan.dueDate.isValid() ?
            invoiceSubscriptionPlan.dueDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
      res.body.dueDate = res.body.dueDate ? moment(res.body.dueDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((invoiceSubscriptionPlan: IInvoiceSubscriptionPlan) => {
        invoiceSubscriptionPlan.date = invoiceSubscriptionPlan.date ? moment(invoiceSubscriptionPlan.date) : undefined;
        invoiceSubscriptionPlan.dueDate = invoiceSubscriptionPlan.dueDate ?
            moment(invoiceSubscriptionPlan.dueDate) : undefined;
      });
    }
    return res;
  }
}
