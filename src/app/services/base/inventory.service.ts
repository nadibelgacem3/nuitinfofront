import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import {IInventory} from "../../shared/models/base/inventory";
import Swal from "sweetalert2";
import {ListArticleWithItem} from "../../shared/models/base/list-article-with-item";
import {IMovement} from "../../shared/models/base/movement.model";


type EntityResponseType = HttpResponse<IInventory>;
type EntityArrayResponseType = HttpResponse<IInventory[]>;

@Injectable({ providedIn: 'root' })
export class InventoryService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/inventories';
  public resourceUrl_2 = SERVER_API_URL + 'company-service/api/inventory-items';
  public resourceUrl_3 = SERVER_API_URL + 'company-service/api/bill-operation-items';
  constructor(protected http: HttpClient) {}

  create(inventory: IInventory): Observable<EntityResponseType> {
    return this.http
      .post<IInventory>(this.resourceUrl, inventory, { observe: 'response' }).pipe(
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

    proposeReference() {
        return this.http.get<any>(`${this.resourceUrl}/proposeReference`, { observe: 'response' }).pipe(
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

    getAllPDf(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IInventory[]>(`${this.resourceUrl}/pdf`, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res))).pipe(
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

  update(inventory: IInventory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inventory);
    return this.http
      .put<IInventory>(this.resourceUrl, inventory, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res))).pipe(
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

  find(id: any): Observable<EntityResponseType> {
    return this.http
      .get<IInventory>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
            catchError(e => {
              Swal.fire({
               icon: 'info',
                 title: 'Network Error',
                text: "the operation couldn't be completed.",
              });
              return throwError(e);
            })
        )
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  checkItem(id: number): Observable<any> {
    return this.http
        .get<any>(`${this.resourceUrl_2}/checkInventoryItem/${id}`, { observe: 'response' });
  }

  checkBillOperationItem(id: number): Observable<any> {
    return this.http
        .get<any>(`${this.resourceUrl_3}/checkBillOperationItem/${id}`, { observe: 'response' });
  }

  checkproduct(id: number): Observable<any> {
    return this.http
        .get<any>(`${this.resourceUrl_2}/checkInventoryItemArticle/${id}`, { observe: 'response' });
  }

  checkBillOperationProduct(id: number): Observable<any> {
    return this.http
        .get<any>(`${this.resourceUrl_3}/checkBillOperationItemArticle/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInventory[]>(this.resourceUrl, { params: options, observe: 'response' })
        .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res))).pipe(
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
            text: "the operation couldn't be completed.",
          });
          return throwError(e);
        })
    );
  }

  protected convertDateFromClient(inventory: IInventory): IInventory {
    const copy: IInventory = Object.assign({}, inventory, {
      dateInventory: inventory.dateInventory && inventory.dateInventory.isValid() ?
          inventory.dateInventory.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateInventory = res.body.dateInventory ? moment(res.body.dateInventory) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((inventory: IInventory) => {
        inventory.dateInventory = inventory.dateInventory ? moment(inventory.dateInventory) : undefined;
      });
    }
    return res;
  }

    search(attribute: string, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInventory[]>(`${this.resourceUrl}/search/${attribute}`, { params: options, observe: 'response' });
    }
}
