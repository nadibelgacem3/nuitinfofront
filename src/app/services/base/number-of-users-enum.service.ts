import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { INumberOfUsersEnum } from 'app/shared/models/base/number-of-users-enum.model';

type EntityResponseType = HttpResponse<INumberOfUsersEnum>;
type EntityArrayResponseType = HttpResponse<INumberOfUsersEnum[]>;

@Injectable({ providedIn: 'root' })
export class NumberOfUsersEnumService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/number-of-users-enums';

  constructor(protected http: HttpClient) {}

  create(numberOfUsersEnum: INumberOfUsersEnum): Observable<EntityResponseType> {
    return this.http.post<INumberOfUsersEnum>(this.resourceUrl, numberOfUsersEnum, { observe: 'response' });
  }

  update(numberOfUsersEnum: INumberOfUsersEnum): Observable<EntityResponseType> {
    return this.http.put<INumberOfUsersEnum>(this.resourceUrl, numberOfUsersEnum, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INumberOfUsersEnum>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INumberOfUsersEnum[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
