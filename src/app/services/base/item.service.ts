import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { IItem } from '../../shared/models/base/item.model';
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {ItemPriceCategory} from "../../shared/models/base/item-price";
import {TranslationMyWayService} from "../translation-my-way.service";

type EntityResponseType = HttpResponse<IItem>;
type EntityArrayResponseType = HttpResponse<IItem[]>;
type EntityResponseTypePrice = HttpResponse<ItemPriceCategory[]>;

@Injectable({ providedIn: 'root' })
export class ItemService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/items';
    public resourceUrl_2 = SERVER_API_URL + 'company-service/api';
  constructor(protected http: HttpClient, protected pipeTranslate: TranslationMyWayService) {}

  create( item: any): Observable<EntityResponseType> {
    return this.http.post<IItem>(this.resourceUrl,  item,
        { observe: 'response' }).pipe(
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

    refreshItemsPriceCategory( item: any): Observable<EntityResponseType> {
        return this.http.post<any>(`${this.resourceUrl}/refreshItemsPriceCategory`,  item,
            { observe: 'response' }).pipe(
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

  createItem(item: IItem): Observable<EntityResponseType> {
    return this.http.post<IItem>(this.resourceUrl, item, { observe: 'response' }).pipe(
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

  update(item: IItem): Observable<EntityResponseType> {
    return this.http.put<IItem>(this.resourceUrl, item, { observe: 'response' }).pipe(
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


    stockUp(item: IItem): Observable<EntityResponseType> {
        return this.http.post<IItem>(`${this.resourceUrl}/stockApprovisionnement`, item, { observe: 'response' }).pipe(
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


    validateCommande(items: any[]): any {
        return this.http.post<any[]>(`${this.resourceUrl}/validateCommande`, items, { observe: 'response' }).pipe(
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

    cancelCommande(items: any[]): any {
        return this.http.post<any[]>(`${this.resourceUrl}/cancelCommande`, items, { observe: 'response' }).pipe(
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


    stockOutput(item: IItem): Observable<EntityResponseType> {
        return this.http.post<IItem>(`${this.resourceUrl}/stockDesapprovisionnement`, item, { observe: 'response' }).pipe(
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
    return this.http.get<IItem>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
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
    displayItemInShop(id: number): Observable<EntityResponseType> {
        return this.http.get<IItem>(`${this.resourceUrl}/displayItemInShop/${id}`, { observe: 'response' }).pipe(
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
    return this.http.get<IItem[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(
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
              title: 'Alert',
              text:  this.pipeTranslate.translate('raison_delete'),
          });
          return throwError(e);
        })
    );
  }
    deleteVariant(id: number): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/delete/${id}`, { observe: 'response' });
    }

    deleteTax(item: any): Observable<HttpResponse<{}>> {
        return this.http.post<any>(`${this.resourceUrl}/deleteTaxItem`, item , { observe: 'response' }).pipe(
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
  getAllItems(): Observable<EntityArrayResponseType> {
    return this.http.get<IItem[]>(this.resourceUrl, { observe: 'response' }).pipe(
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

    showListPrices(id: number): Observable<ItemPriceCategory[]> {

        return this.http.get<ItemPriceCategory[]>(`${this.resourceUrl_2}/item-price-categories/${id}`);
    }
}
