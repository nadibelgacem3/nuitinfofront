import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITiersTypeEnum } from 'app/shared/models/base/tiers-type-enum.model';

type EntityResponseType = HttpResponse<ITiersTypeEnum>;
type EntityArrayResponseType = HttpResponse<ITiersTypeEnum[]>;

@Injectable({ providedIn: 'root' })
export class TiersTypeEnumService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/tiers-type-enums';

  constructor(protected http: HttpClient) {}

  create(tiersTypeEnum: ITiersTypeEnum): Observable<EntityResponseType> {
    return this.http.post<ITiersTypeEnum>(this.resourceUrl, tiersTypeEnum, { observe: 'response' });
  }

  update(tiersTypeEnum: ITiersTypeEnum): Observable<EntityResponseType> {
    return this.http.put<ITiersTypeEnum>(this.resourceUrl, tiersTypeEnum, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITiersTypeEnum>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITiersTypeEnum[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
