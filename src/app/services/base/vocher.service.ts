import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { IVocher } from '../../shared/models/base/vocher.model';

type EntityResponseType = HttpResponse<IVocher>;
type EntityArrayResponseType = HttpResponse<IVocher[]>;

@Injectable({ providedIn: 'root' })
export class VocherService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/vochers';

  constructor(protected http: HttpClient) {}

  create(vocher: IVocher): Observable<EntityResponseType> {
    return this.http.post<IVocher>(this.resourceUrl, vocher, { observe: 'response' });
  }

  update(vocher: IVocher): Observable<EntityResponseType> {
    return this.http.put<IVocher>(this.resourceUrl, vocher, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVocher>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVocher[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
