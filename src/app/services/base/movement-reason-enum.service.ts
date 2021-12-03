import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMovementReasonEnum } from 'app/shared/models/base/movement-reason-enum.model';

type EntityResponseType = HttpResponse<IMovementReasonEnum>;
type EntityArrayResponseType = HttpResponse<IMovementReasonEnum[]>;

@Injectable({ providedIn: 'root' })
export class MovementReasonEnumService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/movement-reason-enums';

  constructor(protected http: HttpClient) {}

  create(movementReasonEnum: IMovementReasonEnum): Observable<EntityResponseType> {
    return this.http.post<IMovementReasonEnum>(this.resourceUrl, movementReasonEnum, { observe: 'response' });
  }

  update(movementReasonEnum: IMovementReasonEnum): Observable<EntityResponseType> {
    return this.http.put<IMovementReasonEnum>(this.resourceUrl, movementReasonEnum, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMovementReasonEnum>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMovementReasonEnum[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
