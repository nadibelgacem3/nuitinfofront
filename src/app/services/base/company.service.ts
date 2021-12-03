import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import {SERVER_API_URL, SERVER_API_URL_2} from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { ICompany } from '../../shared/models/base/company.model';

type EntityResponseType = HttpResponse<ICompany>;
type EntityArrayResponseType = HttpResponse<ICompany[]>;

@Injectable({ providedIn: 'root' })
export class CompanyService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/company-configs';
  public resourceUrl_2 = SERVER_API_URL_2 + 'eshop/api/company-configs';
  constructor(protected http: HttpClient) {}

  create(company: ICompany): Observable<EntityResponseType> {
    return this.http.post<ICompany>(this.resourceUrl, company, { observe: 'response' });
  }

  update(company: any): Observable<EntityResponseType> {
    return this.http.put<any>(this.resourceUrl, company, { observe: 'response' });
  }
  updateEshop(company: any): Observable<EntityResponseType> {
    return this.http.put<any>(this.resourceUrl_2, company, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICompany>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICompany[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
