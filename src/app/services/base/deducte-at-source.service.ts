import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { IDepot } from '../../shared/models/base/depot.model';

type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;
@Injectable({
  providedIn: 'root'
})
export class DeducteAtSourceService {

  public resourceUrl = SERVER_API_URL + 'company-service/api/deducted-at-sources';

  constructor(protected http: HttpClient) {}

  create(depot: any): Observable<EntityResponseType> {
    return this.http.post<any>(this.resourceUrl, depot, { observe: 'response' });
  }

  update(depot: any): Observable<EntityResponseType> {
    return this.http.put<any>(this.resourceUrl, depot, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDepot>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
