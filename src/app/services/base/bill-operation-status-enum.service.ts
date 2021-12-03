import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { IBillOperationStatusEnum } from '../../shared/models/base/bill-operation-status-enum.model';

type EntityResponseType = HttpResponse<IBillOperationStatusEnum>;
type EntityArrayResponseType = HttpResponse<IBillOperationStatusEnum[]>;

@Injectable({ providedIn: 'root' })
export class BillOperationStatusEnumService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/bill-operation-status-enums';

  constructor(protected http: HttpClient) {}

  create(billOperationStatusEnum: IBillOperationStatusEnum): Observable<EntityResponseType> {
    return this.http.post<IBillOperationStatusEnum>(this.resourceUrl, billOperationStatusEnum, { observe: 'response' });
  }

  update(billOperationStatusEnum: IBillOperationStatusEnum): Observable<EntityResponseType> {
    return this.http.put<IBillOperationStatusEnum>(this.resourceUrl, billOperationStatusEnum, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBillOperationStatusEnum>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBillOperationStatusEnum[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
