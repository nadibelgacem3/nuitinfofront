import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICompanyBusinessTypeEnum } from '../../shared/models/base/company-business-type-enum.model';

type EntityResponseType = HttpResponse<ICompanyBusinessTypeEnum>;
type EntityArrayResponseType = HttpResponse<ICompanyBusinessTypeEnum[]>;

@Injectable({ providedIn: 'root' })
export class CompanyBusinessTypeEnumService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/company-business-type-enums';

  constructor(protected http: HttpClient) {}

  create(companyBusinessTypeEnum: ICompanyBusinessTypeEnum): Observable<EntityResponseType> {
    return this.http.post<ICompanyBusinessTypeEnum>(this.resourceUrl, companyBusinessTypeEnum, { observe: 'response' });
  }

  update(companyBusinessTypeEnum: ICompanyBusinessTypeEnum): Observable<EntityResponseType> {
    return this.http.put<ICompanyBusinessTypeEnum>(this.resourceUrl, companyBusinessTypeEnum, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICompanyBusinessTypeEnum>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICompanyBusinessTypeEnum[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
