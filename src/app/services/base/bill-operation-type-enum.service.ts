import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBillOperationTypeEnum } from '../../shared/models/base/bill-operation-type-enum.model';

type EntityResponseType = HttpResponse<IBillOperationTypeEnum>;
type EntityArrayResponseType = HttpResponse<IBillOperationTypeEnum[]>;

@Injectable({ providedIn: 'root' })
export class BillOperationTypeEnumService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/bill-operation-type-enums';

  constructor(protected http: HttpClient) {}

  create(billOperationTypeEnum: IBillOperationTypeEnum): Observable<EntityResponseType> {
    return this.http.post<IBillOperationTypeEnum>(this.resourceUrl, billOperationTypeEnum, { observe: 'response' });
  }

  update(billOperationTypeEnum: IBillOperationTypeEnum): Observable<EntityResponseType> {
    return this.http.put<IBillOperationTypeEnum>(this.resourceUrl, billOperationTypeEnum, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBillOperationTypeEnum>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBillOperationTypeEnum[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
