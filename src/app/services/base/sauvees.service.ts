

import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {SERVER_API_URL} from '../../app.constants';
import {createRequestOption} from '../../shared/util/request-util';
import {IItemCategory} from '../../shared/models/base/item-category.model';
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {TranslationMyWayService} from "../translation-my-way.service";

type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable({providedIn: 'root'})
export class SauveesService {
  public resourceUrl = SERVER_API_URL + 'sauveteurs-micro/api/sauvees';

  //public resourceUrl = SERVER_API_URL + 'api/article-category-configs';

  constructor(protected http: HttpClient, private pipeTranslate: TranslationMyWayService) {
  }

  create(itemCategory: any): Observable<EntityResponseType> {
    return this.http.post<any>(this.resourceUrl, itemCategory, {observe: 'response'}).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
          text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  update(itemCategory: any): Observable<EntityResponseType> {
    return this.http.put<IItemCategory>(this.resourceUrl, itemCategory, {observe: 'response'}).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
          text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  checkExists(name: string) {
    return this.http.get(`${this.resourceUrl}/checkNameConfigTranslated/${name}`);
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IItemCategory>(`${this.resourceUrl}/${id}`, {observe: 'response'}).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
          text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IItemCategory[]>(this.resourceUrl, {params: options, observe: 'response'}).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: 'Network Error',
          text: "the operation couldn't be completed.",
        });
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'}).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'info',
          title: this.pipeTranslate.translate('alert'),
          text: this.pipeTranslate.translate('raison_delete'),
          showConfirmButton: false,
          timer: 1500
        });
        return throwError(e);
      })
    );
  }
}
