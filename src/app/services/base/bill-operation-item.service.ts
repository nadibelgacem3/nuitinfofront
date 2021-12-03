import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { IBillOperationItem } from '../../shared/models/base/bill-operation-item.model';

type EntityResponseType = HttpResponse<IBillOperationItem>;
type EntityArrayResponseType = HttpResponse<IBillOperationItem[]>;

@Injectable({ providedIn: 'root' })
export class BillOperationItemService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/bill-operation-items';

  constructor(protected http: HttpClient) {}

  create(billOperationItem: IBillOperationItem): Observable<EntityResponseType> {
    return this.http.post<IBillOperationItem>(this.resourceUrl, billOperationItem, { observe: 'response' });
  }

  update(billOperationItem: IBillOperationItem): Observable<EntityResponseType> {
    return this.http.put<IBillOperationItem>(this.resourceUrl, billOperationItem, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBillOperationItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBillOperationItem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
