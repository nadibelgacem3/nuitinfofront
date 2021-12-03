import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { IInvoicePaymentHistory } from '../../shared/models/base/invoice-payment-history.model';
import Swal from "sweetalert2";
import {IInvoicePayment} from "../../shared/add-payment-invoice/payment";

type EntityResponseType = HttpResponse<IInvoicePayment>;
type EntityArrayResponseType = HttpResponse<IInvoicePayment[]>;

@Injectable({ providedIn: 'root' })
export class InvoicePaymentHistoryService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/payments';

  constructor(protected http: HttpClient) {}

  create(invoicePaymentHistory: any): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(invoicePaymentHistory);
    return this.http
      .post<IInvoicePayment>(this.resourceUrl, invoicePaymentHistory, { observe: 'response' })
      .pipe(
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

  update(invoicePaymentHistory: IInvoicePayment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(invoicePaymentHistory);
    return this.http
      .put<IInvoicePayment>(this.resourceUrl, invoicePaymentHistory, { observe: 'response' })
        .pipe(
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
    return this.http
      .get<IInvoicePayment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res))).pipe(
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
    return this.http
      .get<IInvoicePaymentHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res))).pipe(
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

  protected convertDateFromClient(invoicePaymentHistory: IInvoicePayment): IInvoicePayment {
    const copy: IInvoicePayment = Object.assign({}, invoicePaymentHistory, {
      paymentDate:
        invoicePaymentHistory.paymentDate && invoicePaymentHistory.paymentDate.isValid()
          ? invoicePaymentHistory.paymentDate.toJSON()
          : undefined,
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
      res.body.forEach((invoicePaymentHistory: IInvoicePayment) => {
        invoicePaymentHistory.paymentDate = invoicePaymentHistory.paymentDate ?
            moment(invoicePaymentHistory.paymentDate) : undefined;
      });
    }
    return res;
  }
}
