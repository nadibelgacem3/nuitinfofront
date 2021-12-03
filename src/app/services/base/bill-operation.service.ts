import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import * as moment from 'moment';

import {SERVER_API_URL} from '../../app.constants';
import {createRequestOption} from '../../shared/util/request-util';
import {IBillOperation} from '../../shared/models/base/bill-operation.model';

import Swal from "sweetalert2";
import {Moment} from "moment";

type EntityResponseType = HttpResponse<IBillOperation>;
type EntityArrayResponseType = HttpResponse<IBillOperation[]>;

@Injectable({providedIn: 'root'})
export class BillOperationService {
    public resourceUrl = SERVER_API_URL + 'company-service/api/bill-operations';

    constructor(protected http: HttpClient) {
    }

    create(billOperation: IBillOperation): Observable<EntityResponseType> {
        // const copy = this.convertDateFromClient(billOperation);
        return this.http
            .post<IBillOperation>(this.resourceUrl, billOperation, {observe: 'response'})
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

    proposeReference(billOperation: any): any {
        // const copy = this.convertDateFromClient(billOperation);
        return this.http
            .post<any>(`${this.resourceUrl}/proposeReference`, billOperation, {observe: 'response'})
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


    convertToInvoice(billOperation: IBillOperation): Observable<EntityResponseType> {
        // const copy = this.convertDateFromClient(billOperation);
        return this.http
            .post<IBillOperation>(`${this.resourceUrl}/convertBillOperation`, billOperation, {observe: 'response'}).pipe(
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


    update(billOperation: IBillOperation): Observable<EntityResponseType> {
        // const copy = this.convertDateFromClient(billOperation);
        return this.http
            .put<IBillOperation>(this.resourceUrl, billOperation, {observe: 'response'})
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

    generatePDF(billOperation: IBillOperation): Observable<EntityResponseType> {
        // const copy = this.convertDateFromClient(billOperation);
        return this.http
            .put<IBillOperation>(`${this.resourceUrl}/addPdf`, billOperation, {observe: 'response'})
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

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBillOperation>(`${this.resourceUrl}/${id}`, {observe: 'response'})
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

    sendEmail(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IBillOperation>(`${this.resourceUrl}/sendEmailPdf/${id}`, {observe: 'response'})
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

    oldestLatestYear(): Observable<any> {
        return this.http
            .get<any>(`${this.resourceUrl}/oldestLatestYear`, {observe: 'response'})
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

    deleteItem(idBill: number, idItem: number): Observable<any> {
        return this.http
            .get<any>(`${this.resourceUrl}/deleteRelationBetweenBillOpAndBillOpItem/${idBill}/${idItem}`,
                {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res))).pipe(
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

    checkOverdueInvoices() {
        return this.http
            .get<any>(`${this.resourceUrl}/checkOverdueInvoices`, {observe: 'response'}).pipe(
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


    // public resourceUrl2 = SERVER_API_URL + 'company-service/api/statistics/statAlltest';
    //
    // findStat(): Observable<any> {
    //     return this.http
    //         .get<any>(this.resourceUrl2, { observe: 'response' })
    //         .pipe(map((res: any) => this.convertDateFromServer(res))).pipe(
    //             catchError(e => {
    //                 Swal.fire({
    //                    icon: 'info',
    //                      title: 'Network Error',
    //                     text: "the operation couldn't be completed.",
    //                 });
    //                 return throwError(e);
    //             })
    //         );
    // }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(this.resourceUrl, {params: options, observe: 'response'})
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

    queryPdf(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/pdf`, {params: options, observe: 'response'})
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

    getAllInvoiceSales(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/saleInvoices`, {params: options, observe: 'response'})
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

    getAllBlsSales(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/saleBls`, {params: options, observe: 'response'})
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

    getAllAvoirsSales(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/saleAvoirs`, {params: options, observe: 'response'})
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

    getAllInvoicePurchase(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/purchaseInvoices`, {params: options, observe: 'response'})
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

    getAllQuotesSales(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/saleQuotes`, {params: options, observe: 'response'})
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

    getAllBonsSales(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/saleBons`, {params: options, observe: 'response'})
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
    /*
    search bill operation purchase
     */
    searchBonsPurchase(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/purchaseBons/search/${key}`, {params: options, observe: 'response'})
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
    searchInvoicePurchase(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/purchaseInvoices/search/${key}`, {params: options, observe: 'response'})
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

    searchPurchaseCommand(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/purchaseCommandes/search/${key}`, {params: options, observe: 'response'})
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

    search(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/billOperations/search/${key}`, {params: options, observe: 'response'})
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
    searchBonsSalesTiers(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/saleBonsOfTiers/${key}`, {params: options, observe: 'response'})
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

    searchInvoiceSalesTiers(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/saleInvoicesOfTiers/${key}`, {params: options, observe: 'response'})
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
    searchSaleQuotesTiers(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/saleQuotesOfTiers/${key}`, {params: options, observe: 'response'})
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
    searchSaleAvoirsTiers(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/saleAvoirsOfTiers/${key}`, {params: options, observe: 'response'})
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
    searchSaleBlsTiers(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/saleBlsOfTiers/${key}`, {params: options, observe: 'response'})
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
    /*
    search bill operation purchase with tiers
     */
    searchBonsPurchaseTiers(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/purchaseBonsOfTiers/${key}`, {params: options, observe: 'response'})
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

    searchInvoicePurchaseTiers(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/purchaseInvoicesOfTiers/${key}`, {params: options, observe: 'response'})
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

    searchPurchaseCmdTiers(key, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/purchaseCommandesOfTiers/${key}`, {params: options, observe: 'response'})
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


    getAllBonsPurchcase(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/purchaseBons`, {params: options, observe: 'response'})
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

    getAllCommandesSales(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/saleCommandes`, {params: options, observe: 'response'})
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

    getAllCommandesPurchase(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/purchaseCommandes`, {params: options, observe: 'response'})
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

    query2DateInvoice(startDate: Moment, endDate: Moment, req): any {
        const options = createRequestOption(req);
        const StatProperties = {
            startDate,
            endDate,
        };
        return this.http.post<any>(`${this.resourceUrl}/SaleInvoicesInTimeInterval`, StatProperties, {params: options, observe: 'response'})
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

    query2DateBonPurchase(startDate: Moment, endDate: Moment, req): any {
        const options = createRequestOption(req);
        const StatProperties = {
            startDate,
            endDate,
        };
        return this.http.post<any>(`${this.resourceUrl}/PurchaseBonsInTimeInterval`, StatProperties, {params: options, observe: 'response'})
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

    query2DateInvoicePurchase(startDate: Moment, endDate: Moment, req): any {
        const options = createRequestOption(req);
        const StatProperties = {
            startDate,
            endDate,
        };
        return this.http.post<any>(`${this.resourceUrl}/PurchaseInvoicesInTimeInterval`, StatProperties, {params: options, observe: 'response'})
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

    query2DateCmd(startDate: Moment, endDate: Moment, req): any {
        const options = createRequestOption(req);
        const StatProperties = {
            startDate,
            endDate,
        };
        return this.http.post<any>(`${this.resourceUrl}/PurchaseCommandesInTimeInterval`, StatProperties, {params: options, observe: 'response'})
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
    query2DateQuotes(startDate: Moment, endDate: Moment, req): any {
        const options = createRequestOption(req);
        const StatProperties = {
            startDate,
            endDate,
        };
        return this.http.post<any>(`${this.resourceUrl}/SaleQuotesInTimeInterval`, StatProperties, {params: options, observe: 'response'})
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

    query2DateBons(startDate: Moment, endDate: Moment, req): any {
        const options = createRequestOption(req);
        const StatProperties = {
            startDate,
            endDate,
        };
        return this.http.post<any>(`${this.resourceUrl}/SaleBonsInTimeInterval`, StatProperties, {params: options, observe: 'response'})
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

    query2DateAvoirs(startDate: Moment, endDate: Moment, req): any {
        const options = createRequestOption(req);
        const StatProperties = {
            startDate,
            endDate,
        };
        return this.http.post<any>(`${this.resourceUrl}/SaleAvoirsInTimeInterval`, StatProperties, {params: options, observe: 'response'})
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

    query2DateBls(startDate: Moment, endDate: Moment, req): any {
        const options = createRequestOption(req);
        const StatProperties = {
            startDate,
            endDate,
        };
        return this.http.post<any>(`${this.resourceUrl}/SaleBlsInTimeInterval`, StatProperties, {params: options, observe: 'response'})
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


    query2Date(startDate: Moment, endDate: Moment): any {
        const StatProperties = {
            startDate,
            endDate,
        };
        return this.http.post<any>(`${this.resourceUrl}/billoperationsInTimeInterval`, StatProperties, { observe: 'response'})
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
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'}).pipe(
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

    archive(id: number): Observable<HttpResponse<{}>> {
        return this.http.get(`${this.resourceUrl}/archive/${id}`, {observe: 'response'}).pipe(
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

    protected convertDateFromClient(billOperation: IBillOperation): IBillOperation {
        const copy: IBillOperation = Object.assign({}, billOperation, {
            date: billOperation.date && billOperation.date.isValid() ? billOperation.date.toJSON() : undefined,
            dueDate: billOperation.dueDate && billOperation.dueDate.isValid() ? billOperation.dueDate.toJSON() : undefined,
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.date = res.body.date ? moment(res.body.date) : undefined;
            res.body.dueDate = res.body.dueDate ? moment(res.body.dueDate) : undefined;
        }
        return res;
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

    totalTTC(id: number): any {
        return this.http.get<any>(`${this.resourceUrl}/totalTTC/${id}`).pipe(
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

    convertToReceived(id: number): any {
        return this.http.get<any>(`${this.resourceUrl}/convertToReceived/${id}`).pipe(
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

    totalHT(id: number): any {
        return this.http.get<any>(`${this.resourceUrl}/totalHT/${id}`);
    }


    validate(id: number) {
        return this.http.get<any>(`${this.resourceUrl}/validate/${id}`).pipe(
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

    validateStockBalancing(id: number) {
        return this.http.get<any>(`${this.resourceUrl}/validateStockBalancing/${id}`).pipe(
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

    canceled(id: any) {
        return this.http.get<any>(`${this.resourceUrl}/canceled/${id}`).pipe(
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

    draft(id: any) {
        return this.http.get<any>(`${this.resourceUrl}/draft/${id}`).pipe(
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

    updateBiLL(id: number) {
        return this.http.get<any>(`${this.resourceUrl}/testProgressPayment/${id}`).pipe(
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

    convertDeductedAtSourceToFalse(id: number) {
        return this.http.get<any>(`${this.resourceUrl}/convertDeductedAtSourceToFalse/${id}`).pipe(
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

    convertDeductedAtSourceToTrue(id: number) {
        return this.http.get<any>(`${this.resourceUrl}/convertDeductedAtSourceToTrue/${id}`).pipe(
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

    deleteInvoiceWithQuantityRecovery(id: number) {
        return this.http.get<any>(`${this.resourceUrl}/deleteBillOperationWithQuantityRecovery/${id}`).pipe(
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


    allBill(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IBillOperation[]>(`${this.resourceUrl}/billOperationWithTTCandHT`,
                {params: options, observe: 'response'})
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


    checkReference(billOperation) {
        return this.http
            .post<boolean>(`${this.resourceUrl}/verifyReference`, billOperation);
        // return this.http.get(`${this.resourceUrl}/checkReference/${name}`);
    }
}
