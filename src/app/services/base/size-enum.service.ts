import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISizeEnum } from 'app/shared/models/base/size-enum.model';

type EntityResponseType = HttpResponse<ISizeEnum>;
type EntityArrayResponseType = HttpResponse<ISizeEnum[]>;

@Injectable({ providedIn: 'root' })
export class SizeEnumService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/size-enums';

  constructor(protected http: HttpClient) {}

  create(sizeEnum: ISizeEnum): Observable<EntityResponseType> {
    return this.http.post<ISizeEnum>(this.resourceUrl, sizeEnum, { observe: 'response' });
  }

  update(sizeEnum: ISizeEnum): Observable<EntityResponseType> {
    return this.http.put<ISizeEnum>(this.resourceUrl, sizeEnum, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISizeEnum>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISizeEnum[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
