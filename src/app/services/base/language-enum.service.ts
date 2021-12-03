import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILanguageEnum } from '../../shared/models/base/language-enum.model';

type EntityResponseType = HttpResponse<ILanguageEnum>;
type EntityArrayResponseType = HttpResponse<ILanguageEnum[]>;

@Injectable({ providedIn: 'root' })
export class LanguageEnumService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/language-enums';

  constructor(protected http: HttpClient) {}

  create(languageEnum: ILanguageEnum): Observable<EntityResponseType> {
    return this.http.post<ILanguageEnum>(this.resourceUrl, languageEnum, { observe: 'response' });
  }

  update(languageEnum: ILanguageEnum): Observable<EntityResponseType> {
    return this.http.put<ILanguageEnum>(this.resourceUrl, languageEnum, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILanguageEnum>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILanguageEnum[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
