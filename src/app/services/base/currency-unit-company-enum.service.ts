import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { ICurrencyUnitCompanyEnum } from '../../shared/models/base/currency-unit-company-enum.model';

type EntityResponseType = HttpResponse<ICurrencyUnitCompanyEnum>;
type EntityArrayResponseType = HttpResponse<ICurrencyUnitCompanyEnum[]>;

@Injectable({ providedIn: 'root' })
export class CurrencyUnitCompanyEnumService {
  public resourceUrl = SERVER_API_URL + 'api/currency-unit-company-enums';

  constructor(protected http: HttpClient) {}

  create(currencyUnitCompanyEnum: ICurrencyUnitCompanyEnum): Observable<EntityResponseType> {
    return this.http.post<ICurrencyUnitCompanyEnum>(this.resourceUrl, currencyUnitCompanyEnum, { observe: 'response' });
  }

  update(currencyUnitCompanyEnum: ICurrencyUnitCompanyEnum): Observable<EntityResponseType> {
    return this.http.put<ICurrencyUnitCompanyEnum>(this.resourceUrl, currencyUnitCompanyEnum, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICurrencyUnitCompanyEnum>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICurrencyUnitCompanyEnum[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
