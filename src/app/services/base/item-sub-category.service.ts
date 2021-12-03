import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { IItemSubCategory } from '../../shared/models/base/item-sub-category.model';
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {TranslationMyWayService} from "../translation-my-way.service";

type EntityResponseType = HttpResponse<IItemSubCategory>;
type EntityArrayResponseType = HttpResponse<IItemSubCategory[]>;

@Injectable({ providedIn: 'root' })
export class ItemSubCategoryService {
  public resourceUrl = SERVER_API_URL + 'sauveteurs-micro/api/publication-sub-categories';
    public resourceUrl_2 = SERVER_API_URL + 'sauveteurs-micro/api/publication-categories';
  constructor(protected http: HttpClient, private pipeTranslate: TranslationMyWayService) {}

  create(itemSubCategory: any): Observable<EntityResponseType> {
    return this.http.post<IItemSubCategory>(this.resourceUrl, itemSubCategory, { observe: 'response' }).pipe(
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

    checkExists(name: string, id: string) {
        return this.http.get(`${this.resourceUrl_2}/checkNameConfigTranslatedOfSubCategory/${id}/${name}`);
    }

  update(itemSubCategory: any): Observable<EntityResponseType> {
    return this.http.put<IItemSubCategory>(this.resourceUrl, itemSubCategory, { observe: 'response' }).pipe(
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

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IItemSubCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
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
    return this.http.get<IItemSubCategory[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(
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
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
        catchError(e => {
            Swal.fire({
               icon: 'info',
                 title: 'Network Error',
                text:  this.pipeTranslate.translate('raison_delete'),
            });
            return throwError(e);
        })
    );
  }
}
