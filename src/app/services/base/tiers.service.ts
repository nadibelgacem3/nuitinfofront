import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import { SERVER_API_URL } from '../../app.constants';

import { ITiers } from '../../shared/models/base/tiers.model';
import {catchError, map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {createRequestOption} from '../../shared/util/request-util';
import {TranslationMyWayService} from "../translation-my-way.service";
import {IBillOperation} from "../../shared/models/base/bill-operation.model";
import * as moment from "moment";

type EntityResponseType = HttpResponse<ITiers>;
type EntityArrayResponseType = HttpResponse<ITiers[]>;
type EntityArrayResponseType_2 = HttpResponse<IBillOperation[]>;
@Injectable({ providedIn: 'root' })
export class TiersService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/tiers';

  constructor(protected http: HttpClient, private pipeTranslate: TranslationMyWayService) {}

  create(tiers: any): Observable<EntityResponseType> {
    return this.http.post<any>(this.resourceUrl, tiers, { observe: 'response' }).pipe(
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

  update(tiers: ITiers): Observable<EntityResponseType> {
    return this.http.put<ITiers>(this.resourceUrl, tiers, { observe: 'response' }).pipe(
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
    return this.http.get<ITiers>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
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

    getAllCustomers(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITiers[]>(`${this.resourceUrl}/customers`, { params: options, observe: 'response' }).pipe(
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

    getAllProvidersPDF(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITiers[]>(`${this.resourceUrl}/suppliersPdf`, { params: options, observe: 'response' }).pipe(
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

    getAllProviders(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITiers[]>(`${this.resourceUrl}/suppliers`, { params: options, observe: 'response' }).pipe(
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

    getAllCustomersPDF(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITiers[]>(`${this.resourceUrl}/customersPdf`, { params: options, observe: 'response' }).pipe(
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
    refCustomer(): Observable<HttpResponse<string>> {
        return this.http.get<string>(`${this.resourceUrl}/refCustomer`, { observe: 'response' }).pipe(
            catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'Something went wrong! ',
                });
                return throwError(e);
            })
        );
    }

    search(attribute: string, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITiers[]>(`${this.resourceUrl}/customersSearch?attribute=${attribute}`, { params: options, observe: 'response' });
    }

    searchProviders(attribute: string,  req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITiers[]>(`${this.resourceUrl}/suppliersSearch?attribute=${attribute}`, { params: options, observe: 'response' });
    }

    refSupplier(): any {
        return this.http.get<any>(`${this.resourceUrl}/refSupplier`, { observe: 'response' }).pipe(
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
    listBillOperations(id): Observable<EntityArrayResponseType_2> {
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/listBillOperations/${id}`, { observe: 'response' })
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

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((billOperation: IBillOperation) => {
                billOperation.date = billOperation.date ? moment(billOperation.date) : undefined;
                billOperation.dueDate = billOperation.dueDate ? moment(billOperation.dueDate) : undefined;
            });
        }
        return res;
    }

    proposeCustomerReference() {
        return this.http.get<any>(`${this.resourceUrl}/proposeCustomerReference`, { observe: 'response' }).pipe(
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

    proposeSupplierReference() {
        return this.http.get<any>(`${this.resourceUrl}/proposeSupplierReference`, { observe: 'response' }).pipe(
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
  // query(req?: any): Observable<EntityArrayResponseType> {
  //   const options = createRequestOption(req);
  //   return this.http.get<ITiers[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(
  //       catchError(e => {
  //         Swal.fire({
  //          icon: 'info',
  //            title: 'Network Error',
  //           text: "the operation couldn't be completed.",
  //         });
  //         return throwError(e);
  //       })
  //   );
  // }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
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
    searchBonsSales(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/saleBons/search/${key}`, {params: options, observe: 'response'})
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

    searchInvoiceSales(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/saleInvoices/search/${key}`, {params: options, observe: 'response'})
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
    searchSaleQuotes(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/saleQuotes/search/${key}`, {params: options, observe: 'response'})
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
    searchSaleAvoirs(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/saleAvoirs/search/${key}`, {params: options, observe: 'response'})
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
    searchSaleBls(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/saleBls/search/${key}`, {params: options, observe: 'response'})
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
}
