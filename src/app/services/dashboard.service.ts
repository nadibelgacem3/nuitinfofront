import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../app.constants';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {forkJoin, Observable, throwError} from 'rxjs';
import {IBL} from '../shared/models/base/bl.model';
import {Tiers} from '../shared/models/tiers';
import {Moment} from 'moment';
import {catchError, retry} from 'rxjs/operators';
import Swal from "sweetalert2";
import {Documents} from "../shared/models/dashboard/dashboard-documents.model";
import {BillOperation} from "../shared/models/base/bill-operation.model";
import {Stock} from "../shared/models/dashboard/dashboard-stock";
import {BestCustomers} from "../shared/models/dashboard/dashboard-bestCustomers";


/*
type EntityResponseType = HttpResponse<IBL>;
type EntityArrayResponseType = HttpResponse<IBL[]>;

type EntityResponseTypeTiers = HttpResponse<Tiers>;
type EntityArrayResponseTypeTiers = HttpResponse<Tiers[]>;
*/


@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    public resourceUrl = SERVER_API_URL + 'company-service/api/dashboard';


    constructor(protected http: HttpClient) {
    }

    /* totalSuppliers(): Observable<HttpResponse<{}>> {
         return this.http.get<number>(`${this.resourceUrl}/totalSuppliers`, {observe: 'response'})
             .pipe(catchError(e => {
                 Swal.fire({
                    icon: 'info',
                      title: 'Network Error',
                     text: 'no connection to remote server'
                 });
                 return throwError(e);
             }));
     }*/


    totalCustomers(): Observable<HttpResponse<{}>> {
        return this.http.get<number>(`${this.resourceUrl}/totalCustomers`, {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }


    /***********************************************************************************************
                            *  Facture vente
     ************************************************************************************************/
    getAllFacturesPurchase(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllInvoicesPurchase`, {observe: 'response'});
    }
    getAllFacturesPurchaseOfToday(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllInvoicesPurchaseOfToday`,
            {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }
    getAllFacturesPurchaseOfWeek(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllInvoicesPurchaseOfWeek`,
            {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }
    getAllFacturesPurchaseOfMonth(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllInvoicesPurchaseOfMonth`,
            {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }
    getAllFacturesPurchaseOfYear(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllInvoicesPurchaseOfYear`,
            {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }


    /***********************************************************************************************
                                    * best Custumor
     ************************************************************************************************/
    bestCustomers(): Observable<HttpResponse<BestCustomers>> {
        return this.http.get<BestCustomers>(`${this.resourceUrl}/bestCustomers`, {observe: 'response'});
    }

    /***********************************************************************************************
                                        * best Suppliers
     ************************************************************************************************/
    bestSuppliers(): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/bestSuppliers`, {observe: 'response'});
    }

    /***********************************************************************************************
                                 *  Avoir Vente
     ************************************************************************************************/

    /**
     * Avoir Service Call
     */
    getAllAvoirSale(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllAvoirsSale`,
            {observe: 'response'});
    }

    /**
     * Avoir of today
     */
    getAllAvoirSaleOfToday(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllAvoirsSaleOfToday`,
            {observe: 'response'});
    }

    /**
     * Avoir of Week
     */
    getAllAvoirSaleOfWeek(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllAvoirsSaleOfWeek`,
            {observe: 'response'});
    }

    /**
     * Avoir of Month
     */
    getAllAvoirSaleOfMonth(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllAvoirsSaleOfMonth`,
            {observe: 'response'});
    }

    /**
     * Avoir of Year
     */
    getAllAvoirSaleOfYear(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllAvoirsSaleOfYear`,
            {observe: 'response'});
    }



    /***********************************************************************************************
                         *  Bons Commande Achat
     ************************************************************************************************/

    getAllCommandesPurchase(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllCommandesPurchase`,
            {observe: 'response'});
    }

    /**
     * Bons Commande Achat Today
     */
    getAllCommandesPurchaseOfToday(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllCommandesPurchaseOfToday`,
            {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }

    /**
     * Bons Commande Achat Week
     */
    getAllCommandesPurchaseOfWeek(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllCommandesPurchaseOfWeek`,
            {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }

    /**
     * Bons Commande Achat Month
     */
    getAllCommandesPurchaseOfMonth(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllCommandesPurchaseOfMonth`,
            {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }

    /**
     * Bons Commande Achat Year
     */
    getAllCommandesPurchaseOfYear(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllCommandesPurchaseOfYear`,
            {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }


    /***********************************************************************************************
                                *  Bon entré Achat
     ************************************************************************************************/

    /**
     * Bon entré Achat
     */

    getAllBonPurchase(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllBonsPurchase`,
            {observe: 'response'});
    }

    /**
     * Bon entré Achat Today
     */
    getAllBonPurchaseOfToday(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllBonsPurchaseOfToday`,
            {observe: 'response'});
    }

    /**
     *  Bon entré Achat Week
     */

    getAllBonPurchaseOfWeek(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllBonsPurchaseOfWeek`,
            {observe: 'response'});
    }

    /**
     *  Bon entré Achat Month
     */
    getAllBonPurchaseOfMonth(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllBonsPurchaseOfMonth`,
            {observe: 'response'});
    }

    /**
     *  Bon entré Achat Year
     */
    getAllBonPurchaseOfYear(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllBonsPurchaseOfYear`,
            {observe: 'response'});
    }

    /***********************************************************************************************
                            *  Facture Sale
     ************************************************************************************************/

    /**
     * Facture Sale
     */
    getAllFacturesSale(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllInvoicesSale`, {observe: 'response'});
    }

    /**
     * Facture Sale Today
     */
    getAllInvoicesSaleOfToday(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllInvoicesSaleOfToday`,
            {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }

    /**
     * Facture Sale Week
     */
    getAllFacturesSaleOfWeek(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllInvoicesSaleOfWeek`,
            {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }


    /**
     * Facture Sale Month
     */
    getAllFacturesSaleOfMonth(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllInvoicesSaleOfMonth`,
            {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }

    /**
     * Facture Sale Year
     */
    getAllFacturesSaleOfYear(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllInvoicesSaleOfYear`,
            {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }

    /***********************************************************************************************
                                      *  Bon de sortie
     ************************************************************************************************/

    /**
     * bon de sortie Total
     */
    getAllBonSale(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllBonsSale`,
            {observe: 'response'});
    }

    /**
     * bon de sortie Today
     */
    getAllBonSaleOfToday(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllBonsSaleOfToday`,
            {observe: 'response'});
    }

    /**
     * bon de sortie Week
     */
    getAllBonSaleOfWeek(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllBonsSaleOfWeek`,
            {observe: 'response'});
    }

    /**
     * bon de sortie Month
     */
    getAllBonSaleOfMonth(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllBonsSaleOfMonth`,
            {observe: 'response'});
    }

    /**
     * bon de sortie Year
     */
    getAllBonSaleOfYear(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllBonsSaleOfYear`,
            {observe: 'response'});
    }


    /***********************************************************************************************
                                    *  Bons de Livraison
     ************************************************************************************************/

    /**
     * Bons de Livraison Total
     */
    getAllBlSale(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllBls`,
            {observe: 'response'});
    }


    /**
     * Bons de Livraison Today
     */
    getAllBlSaleOfToday(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllBlsOfToday`,
            {observe: 'response'});
    }



    /**
     * Bons de Livraison Today
     */
    getAllBlSaleOfWeek(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllBlsOfWeek`,
            {observe: 'response'});
    }


    /**
     * Bons de Livraison Month
     */
    getAllBlSaleOfMonth(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllBlsOfMonth`,
            {observe: 'response'});
    }

    /**
     * Bons de Livraison Year
     */
    getAllBlSaleOfYear(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllBlsOfYear`,
            {observe: 'response'});
    }


    /***********************************************************************************************
                                    *   Client Total
     ************************************************************************************************/
    public TotalClient(): Observable<HttpResponse<number>> {
        return this.http.get<number>(`${this.resourceUrl}/totalCustomers`,
            {observe: 'response'});
    }


    /***********************************************************************************************
                                    *   Fournisseur Total
     ************************************************************************************************/
    public TotalFournisseur(): Observable<HttpResponse<number>> {
        return this.http.get<number>(`${this.resourceUrl}/totalSuppliers`,
            {observe: 'response'});
    }



    /***********************************************************************************************
                                     *   Stock
     ************************************************************************************************/
    public requestDataFromStockCard(): Observable<HttpResponse<Stock>> {
        return this.http.get<Stock>(`${this.resourceUrl}/dashboardStockTotal`,
            {observe: 'response'});
    }



    /*public requestDataFromStockCard(): Observable<[number, number, number, number,
        number]> {
        const totalSup = this.http.get<number>(`${this.resourceUrl}/totalSuppliers`).pipe(
            catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                });
                return throwError(e);
            })
        );
        const totalCus = this.http.get<number>(`${this.resourceUrl}/totalCustomers`);
        const totalItem = this.http.get<number>(`${this.resourceUrl}/totalItems`);
        const totalItemCat = this.http.get<number>(`${this.resourceUrl}/totalItemCategories`);
        const totalItemSubCat = this.http.get<number>(`${this.resourceUrl}/totalItemSubCategories`);
        return forkJoin([totalSup, totalCus, totalItem, totalItemCat, totalItemSubCat]);
    }*/


    /*    public requestDataFromDocumentsCard(): Observable<[number, number, number, number]> {
        const totalInvoices = this.http.get<number>(`${this.resourceUrl}/totalInvoices`);
        const totalBLs = this.http.get<number>(`${this.resourceUrl}/totalBls`);
        const totalQuotes = this.http.get<number>(`${this.resourceUrl}/totalQuotes`);
        const totalBonsSortie = this.http.get<number>(`${this.resourceUrl}/totalBonsSortie`);
        return forkJoin([totalInvoices, totalBLs, totalQuotes, totalBonsSortie]);
    }*/

    /***********************************************************************************************
                                    *   docouments
     ************************************************************************************************/

    /**
     * total documents
     */
    public dashboardDocumentsTotal(): Observable<HttpResponse<Documents>> {
        return this.http.get<Documents>(`${this.resourceUrl}/dashboardDocumentsTotal`, {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }
    /**
     * total documents Today
     */
    public getDashboardDocumentsTotalToday(): Observable<HttpResponse<Documents>> {
        return this.http.get<Documents>(`${this.resourceUrl}/getDashboardDocumentsTotalToday`, {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }

    /**
     * total documents Week
     */
    public getDashboardDocumentsTotalWeek(): Observable<HttpResponse<Documents>> {
        return this.http.get<Documents>(`${this.resourceUrl}/getDashboardDocumentsTotalWeek`, {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }

    /**
     * total documents Month
     */
    public getDashboardDocumentsTotalMonth(): Observable<HttpResponse<Documents>> {
        return this.http.get<Documents>(`${this.resourceUrl}/getDashboardDocumentsTotalMonth`, {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }

    /**
     * total documents Year
     */
    public getDashboardDocumentsTotalYear(): Observable<HttpResponse<Documents>> {
        return this.http.get<Documents>(`${this.resourceUrl}/getDashboardDocumentsTotalYear`, {observe: 'response'})
            .pipe(catchError(e => {
                Swal.fire({
                   icon: 'info',
                     title: 'Network Error',
                    text: 'no connection to remote server'
                }).then(r => r.dismiss);
                return throwError(e);
            }));
    }


    /***********************************************************************************************
                                        * Quote
     ************************************************************************************************/

    /**
     * total Quote
     */
    public getAllQuote(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllQuotes`, {observe: 'response'});
    }


    /**
     *  Quote by Month
     */
    public getAllQuoteOfMonth(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllQuotesOfMonth`, {observe: 'response'});
    }

    /**
     *  Quote by Today
     */
    public getAllQuoteOfToday(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllQuotesOfToday`, {observe: 'response'});
    }

    /**
     *  Quote by Week
     */
    public getAllQuoteOfWeek(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllQuotesOfWeek`, {observe: 'response'});
    }

    /**
     *  Quote by Year
     */
    public getAllQuoteOfYear(): Observable<HttpResponse<BillOperation>> {
        return this.http.get<BillOperation>(`${this.resourceUrl}/getAllQuotesOfYear`, {observe: 'response'});
    }


    /* getAllData(): Observable<EntityArrayResponseType> {
       return this.http.get<IBL[]>(`${this.resourceUrl}/bill-operations`, { observe: 'response' });
     }*/

    /*  getAllTiers(): Observable<EntityArrayResponseTypeTiers> {
        return this.http.get<Tiers[]>(`${this.resourceUrl}/tiers`, { observe: 'response' });
      }*/
    /**
     * Get the number of Total Tiers
     */
    /*getTotalThird(): Observable<EntityArrayResponseTypeTiers> {
      return this.http.get<Tiers[]>(`${this.resourceUrl}/dashboard/totalTiers`, { observe: 'response' }).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }*/

    /**
     * Get the Total Number of Customers
     */
    /*  getTotalCustomers(): Observable<EntityArrayResponseTypeTiers> {
        return this.http.get<Tiers[]>(`${this.resourceUrl}/dashboard/totalCustomers`, { observe: 'response' }).pipe(
          retry(1),
          catchError(this.handleError)
        );
      }*/


    /**
     * Get the Total Number Of the Suppliers
     */
    /*getTotalSuppliers(): Observable<EntityArrayResponseTypeTiers> {
      return this.http.get<Tiers[]>(`${this.resourceUrl}/dashboard/totalSuppliers`, { observe: 'response' }).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }*/

    /**
     * Get Total Number of Invoices
     */
    /*getTotalInvoices(): Observable<EntityArrayResponseType> {
      return this.http.get<IBL[]>(`${this.resourceUrl}/dashboard/totalInvoices`, { observe: 'response' }).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }*/

    /**
     * Get Total Number Avoir
     */
    /*getTotalAvoir(): Observable<EntityArrayResponseType> {
      return this.http.get<IBL[]>(`${this.resourceUrl}/dashboard/totalAvoirs`, { observe: 'response' }).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }
  */
    /**
     * Get the Total Number Of the BL
     */
    /*getTotalBL(): Observable<EntityArrayResponseType> {
      return this.http.get<IBL[]>(`${this.resourceUrl}/dashboard/totalBls`, { observe: 'response' }).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }*/

    /**
     * Get Total of Quotes
     */
    /*getTotalQuotes(): Observable<EntityArrayResponseType> {
      return this.http.get<IBL[]>(`${this.resourceUrl}/dashboard/totalQuotes`, { observe: 'response' }).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }*/

    /*searchExpeditionsByDepartDate(item: number, startDate: Moment, endDate: Moment): Observable<any> {
      const searchDates = {
        item,
        startDate,
        endDate
      };
      return this.http.post(`${this.resourceUrl}/countCustomersOfEachItemInTimeInterval`, searchDates,
      { observe: 'response' });
         /!*.pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
       return this.http
         .get<IExpedition[]>(`${this.resourceUrl}/dateDepart/${startDate}/${endDate}`, { observe: 'response' })
        .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));*!/
    }*/

    /**
     * Get Count Tiers of Each ITEM
     * @param item
     */
    /*countTiersOfEachItem(item: number): Observable<HttpResponse<{}>> {
      return this.http.get<number>(`${this.resourceUrl}/dashboard/countTiersOfEachItem/${item}`,
        { observe: 'response' }).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }*/

    /**
     * Get Count Suppliers of Each ITEM
     * @param item
     */

    /*countSuppliersOfEachItem(item: number): Observable<HttpResponse<{}>> {
      return this.http.get<number>(`${this.resourceUrl}/dashboard/countSuppliersOfEachItem/${item}`,
        { observe: 'response' }).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }*/

    /**
     * Get Count Customers of Each ITEM
     * @param item
     */
    /*countCustomersOfEachItem(item: number): Observable<HttpResponse<{}>> {
      return this.http.get<number>(`${this.resourceUrl}/dashboard/countCustomersOfEachItem/${item}`,
        { observe: 'response' }).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }*/

    /**
     * Get Count Invoices of Each ITEM
     * @param item
     */
    /*countInvoicesOfEachItem(item: number): Observable<HttpResponse<{}>> {
      return this.http.get<number>(`${this.resourceUrl}/dashboard/countInvoicesOfEachItem/${item}`,
        { observe: 'response' }).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }*/

    /**
     * Get Avoirs Invoices of Each ITEM
     * @param item
     */
    /*countAvoirsOfEachItem(item: number): Observable<HttpResponse<{}>> {
      return this.http.get<number>(`${this.resourceUrl}/dashboard/countAvoirsOfEachItem/${item}`,
        { observe: 'response' }).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }
  */
    /**
     * Get Bls Invoices of Each ITEM
     * @param item
     */
    /*countBlsOfEachItem(item: number): Observable<HttpResponse<{}>> {
      return this.http.get<number>(`${this.resourceUrl}/dashboard/countBlsOfEachItem/${item}`,
        { observe: 'response' }).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }*/

    /**
     * Get Quotes Invoices of Each ITEM
     * @param item
     */

    /*countQuotesOfEachItem(item: number): Observable<HttpResponse<{}>> {
      return this.http.get<number>(`${this.resourceUrl}/dashboard/countQuotesOfEachItem/${item}`,
        { observe: 'response' }).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }*/

    /**
     * Get the error Message when service not respond
     * @param error
     */
    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // window.alert(errorMessage);
        return throwError(errorMessage);
    }

}

