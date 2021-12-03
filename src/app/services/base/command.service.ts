import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {SERVER_API_URL, SERVER_API_URL_2} from "../../app.constants";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import Swal from "sweetalert2";
import {createRequestOption} from "../../shared/util/request-util";

import {IBillOperation} from "../../shared/models/base/bill-operation.model";
import {BillOperationEshop, IBillOperationEshop} from "../../shared/models/base/basket";
import {ITiers} from "../../shared/models/base/tiers.model";
import {Moment} from "moment";
type EntityResponseType = HttpResponse<BillOperationEshop>;
type EntityArrayResponseType = HttpResponse<BillOperationEshop[]>;
type EntityArrayResponseType_2 = HttpResponse<any[]>;
@Injectable({
  providedIn: 'root'
})
export class CommandService {

  public resourceUrl = SERVER_API_URL + 'company-service/api/bill-operation-eshops';
    public resourceUrl_2 = SERVER_API_URL + 'api/users/getAllUsersEshopOfSameCompany';
    public resourceUrl_3 = SERVER_API_URL + 'api/users/getAllUsersEshopOfSameCompanyPdf';
    public resourceUrl_4 = SERVER_API_URL + 'api/users';
  constructor(protected http: HttpClient) {}

  create(tva: any): Observable<EntityResponseType> {
    return this.http.post<any>(this.resourceUrl, tva, { observe: 'response' }).pipe(
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

  update(tva: any): Observable<EntityResponseType> {
    return this.http.put<any>(this.resourceUrl, tva, { observe: 'response' }).pipe(
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
    searchInvoiceSalesTiers(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperationEshop[]>(`${this.resourceUrl}/ClientBillOperation/${key}`, {params: options, observe: 'response'})
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

    query2DateInvoice(startDate: Moment, endDate: Moment, req): any {
        const options = createRequestOption(req);
        const StatProperties = {
            startDate,
            endDate,
        };
        return this.http.post<any>(`${this.resourceUrl}/EshopCommandesInTimeInterval`, StatProperties, {params: options, observe: 'response'})
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

    query2Date(startDate: Moment, endDate: Moment): any {
        const StatProperties = {
            startDate,
            endDate,
        };
        return this.http.post<any>(`${this.resourceUrl}/EshopCommandesInTimeIntervalPdf`, StatProperties, { observe: 'response'})
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
    listBillOperations(id, req?: any): Observable<EntityArrayResponseType> {
        return this.http
            .get<IBillOperationEshop[]>(`${this.resourceUrl}/ClientBillOperationPdf/${id}`, {observe: 'response'})
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

    searchInvoiceSales(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperationEshop[]>(`${this.resourceUrl}/eshopCommandes/search/${key}`, {params: options, observe: 'response'})
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

    searchInvoiceSalesPDF(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperationEshop[]>(`${this.resourceUrl}/eshopCommandes/searchPdf/${key}`, {params: options, observe: 'response'})
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
    convertBillOperationEshop(billOperation: IBillOperationEshop): Observable<EntityResponseType> {
        // const copy = this.convertDateFromClient(billOperation);
        return this.http
            .post<IBillOperationEshop>(`${this.resourceUrl}/convertBillOperationEshop`, billOperation, { observe: 'response' }).pipe(
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

    sendEmail(id: string): Observable<EntityResponseType> {
        return this.http
            .get<BillOperationEshop>(`${this.resourceUrl}/sendEmailPdf/${id}`, { observe: 'response' }).pipe(
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

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<any>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
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
    return this.http.get<any[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(
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


    findAllPDF(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<any[]>(`${this.resourceUrl}/eshopCommandesPdf`, { params: options, observe: 'response' }).pipe(
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
    findAll(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<any[]>(`${this.resourceUrl}/eshopCommandes`, { params: options, observe: 'response' }).pipe(
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
    getAllUsersEshopOfSameCompany(req?: any): Observable<EntityArrayResponseType_2> {
        const options = createRequestOption(req);
        return this.http.get<any[]>(this.resourceUrl_2, { params: options, observe: 'response' }).pipe(
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

    getAllUsersEshopOfSameCompanyPDF(req?: any): Observable<EntityArrayResponseType_2> {
        return this.http.get<any[]>(this.resourceUrl_3, {observe: 'response' }).pipe(
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


  delete(id: string): Observable<HttpResponse<{}>> {
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


    validate(id: string, societe) {
        return this.http.get<any>(`${this.resourceUrl}/validate/${id}/${societe}`).pipe(
            catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'Something went wrong!' ,
                });
                return throwError(e);
            })
        );
    }

    delivered(id: string, society) {
        return this.http.get<any>(`${this.resourceUrl}/delivered/${id}/${society}`).pipe(
            catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'Something went wrong!' ,
                });
                return throwError(e);
            })
        );
    }

    search(attribute: string, req?: any): Observable<EntityArrayResponseType_2> {
        const options = createRequestOption(req);
        return this.http.get<any[]>(`${this.resourceUrl_4}/searchUsersOfSameCompany?attribute=${attribute}`, { params: options, observe: 'response' });
    }
}
