import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import { IMovement } from '../../shared/models/base/movement.model';
import Swal from "sweetalert2";
import {Moment} from "moment";
import {ListArticleWithItem} from "../../shared/models/base/list-article-with-item";

type EntityResponseType = HttpResponse<IMovement>;
type EntityArrayResponseType = HttpResponse<IMovement[]>;

@Injectable({ providedIn: 'root' })
export class MovementService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/movements';

  constructor(protected http: HttpClient) {}

  create(movement: IMovement): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(movement);
    return this.http
      .post<IMovement>(this.resourceUrl, movement, { observe: 'response' })
      .pipe(
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

  update(movement: IMovement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(movement);
    return this.http
      .put<IMovement>(this.resourceUrl, copy, { observe: 'response' })
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

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMovement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
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

    query2Date(startDate: Moment, endDate: Moment, req): any {
        const StatProperties = {
            startDate,
            endDate,
        };
        const options = createRequestOption(req);

        return this.http.post<any>(`${this.resourceUrl}/movementsInTimeInterval`, StatProperties, {params: options, observe: 'response'})
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
        //     .pipe(
        //     // tslint:disable-next-line:no-shadowed-variable
        //     map((response => response.body)),
        // );
    }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMovement[]>(this.resourceUrl, { params: options, observe: 'response' })
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

    getAllPDfManual(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMovement[]>(`${this.resourceUrl}/manualPdf`, { params: options, observe: 'response' })
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

    getAllPDf(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMovement[]>(`${this.resourceUrl}/pdf`, { params: options, observe: 'response' })
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
    queryManual(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMovement[]>(`${this.resourceUrl}/manual`, { params: options, observe: 'response' })
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
    queryManualProduct(id, req): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMovement[]>(`${this.resourceUrl}/allManualMovementsOfItem/${id}`, { params: options, observe: 'response' })
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

    allMovementsOfItem(id, req): Observable<EntityArrayResponseType> {
       const options = createRequestOption(req);
        return this.http
            .get<IMovement[]>(`${this.resourceUrl}/allMovementsOfItem/${id}`, { params: req, observe: 'response' })
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

  protected convertDateFromClient(movement: IMovement): IMovement {
    const copy: IMovement = Object.assign({}, movement, {
      date: movement.date && movement.date.isValid() ? movement.date.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((movement: IMovement) => {
        movement.date = movement.date ? moment(movement.date) : undefined;
      });
    }
    return res;
  }

    search(attribute: string, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMovement[]>(`${this.resourceUrl}/search/${attribute}`, { params: options, observe: 'response' });
    }

    searchManual(attribute: string, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMovement[]>(`${this.resourceUrl}/searchManualMovements/${attribute}`, { params: options, observe: 'response' });
    }
}
