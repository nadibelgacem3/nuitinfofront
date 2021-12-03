import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { IInvoicePaymentMethod } from '../../shared/models/base/invoice-payment-method.model';

type EntityResponseType = HttpResponse<IInvoicePaymentMethod>;
type EntityArrayResponseType = HttpResponse<IInvoicePaymentMethod[]>;

@Injectable({ providedIn: 'root' })
export class InvoicePaymentMethodService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/invoice-payment-methods';

  constructor(protected http: HttpClient) {}

  create(invoicePaymentMethod: IInvoicePaymentMethod): Observable<EntityResponseType> {
    return this.http.post<IInvoicePaymentMethod>(this.resourceUrl, invoicePaymentMethod, { observe: 'response' });
  }

  update(invoicePaymentMethod: IInvoicePaymentMethod): Observable<EntityResponseType> {
    return this.http.put<IInvoicePaymentMethod>(this.resourceUrl, invoicePaymentMethod, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInvoicePaymentMethod>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInvoicePaymentMethod[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
