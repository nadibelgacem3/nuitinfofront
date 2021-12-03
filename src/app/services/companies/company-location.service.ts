import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


import {ICompanyLocation} from '../../shared/models/companies/company-location.model';
import {SERVER_API_URL} from '../../app.constants';
import {createRequestOption} from '../../shared/util/request-util';


type EntityResponseType = HttpResponse<ICompanyLocation>;
type EntityArrayResponseType = HttpResponse<ICompanyLocation[]>;

@Injectable({ providedIn: 'root' })
export class CompanyLocationService {
  public resourceUrl = SERVER_API_URL + 'services/companies/api/companyLocations';

  constructor(protected http: HttpClient) {}

  create(companyLocation: ICompanyLocation): Observable<EntityResponseType> {
    return this.http.post<ICompanyLocation>(this.resourceUrl, companyLocation, { observe: 'response' });
  }

  update(companyLocation: ICompanyLocation): Observable<EntityResponseType> {
    return this.http.put<ICompanyLocation>(this.resourceUrl, companyLocation, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICompanyLocation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICompanyLocation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

