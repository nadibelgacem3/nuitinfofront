import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { ICommercialRegister } from '../../shared/models/base/commercial-register.model';

type EntityResponseType = HttpResponse<ICommercialRegister>;
type EntityArrayResponseType = HttpResponse<ICommercialRegister[]>;

@Injectable({ providedIn: 'root' })
export class CommercialRegisterService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/commercial-registers';

  constructor(protected http: HttpClient) {}

  create(commercialRegister: ICommercialRegister): Observable<EntityResponseType> {
    return this.http.post<ICommercialRegister>(this.resourceUrl, commercialRegister, { observe: 'response' });
  }

  update(commercialRegister: ICommercialRegister): Observable<EntityResponseType> {
    return this.http.put<ICommercialRegister>(this.resourceUrl, commercialRegister, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICommercialRegister>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICommercialRegister[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
