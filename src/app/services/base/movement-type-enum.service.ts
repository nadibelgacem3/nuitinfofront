import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMovementTypeEnum } from 'app/shared/models/base/movement-type-enum.model';

type EntityResponseType = HttpResponse<IMovementTypeEnum>;
type EntityArrayResponseType = HttpResponse<IMovementTypeEnum[]>;

@Injectable({ providedIn: 'root' })
export class MovementTypeEnumService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/movement-type-enums';

  constructor(protected http: HttpClient) {}

  create(movementTypeEnum: IMovementTypeEnum): Observable<EntityResponseType> {
    return this.http.post<IMovementTypeEnum>(this.resourceUrl, movementTypeEnum, { observe: 'response' });
  }

  update(movementTypeEnum: IMovementTypeEnum): Observable<EntityResponseType> {
    return this.http.put<IMovementTypeEnum>(this.resourceUrl, movementTypeEnum, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMovementTypeEnum>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMovementTypeEnum[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
