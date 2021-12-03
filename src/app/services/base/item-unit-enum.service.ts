import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IItemUnitEnum } from '../../shared/models/base/item-unit-enum.model';

type EntityResponseType = HttpResponse<IItemUnitEnum>;
type EntityArrayResponseType = HttpResponse<IItemUnitEnum[]>;

@Injectable({ providedIn: 'root' })
export class ItemUnitEnumService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/item-unit-enums';

  constructor(protected http: HttpClient) {}

  create(itemUnitEnum: IItemUnitEnum): Observable<EntityResponseType> {
    return this.http.post<IItemUnitEnum>(this.resourceUrl, itemUnitEnum, { observe: 'response' });
  }

  update(itemUnitEnum: IItemUnitEnum): Observable<EntityResponseType> {
    return this.http.put<IItemUnitEnum>(this.resourceUrl, itemUnitEnum, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IItemUnitEnum>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IItemUnitEnum[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
