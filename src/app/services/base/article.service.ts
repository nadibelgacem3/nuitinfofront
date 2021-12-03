import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {SERVER_API_URL} from '../../app.constants';
import {createRequestOption} from '../../shared/util/request-util';

import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {ItemPriceCategory} from "../../shared/models/base/item-price";
import {IArticle} from "../../shared/models/base/article";
import {ListArticleWithItem} from "../../shared/models/base/list-article-with-item";
import {TranslationMyWayService} from "../translation-my-way.service";
import {ITiers} from "../../shared/models/base/tiers.model";


type EntityResponseType = HttpResponse<IArticle>;
type EntityArrayResponseType = HttpResponse<IArticle[]>;
type EntityArrayResponseType_2 = HttpResponse<ListArticleWithItem[]>;
type EntityResponseTypePrice = HttpResponse<ItemPriceCategory[]>;

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    public resourceUrl = SERVER_API_URL + 'company-service/api/articles';
    public resourceUrl_eshop = SERVER_API_URL + 'eshop/api/articles';
    public resourceUrl_2 = SERVER_API_URL + 'company-service/api';

    constructor(protected http: HttpClient, protected pipeTranslate: TranslationMyWayService) {
    }

    create(item: any): Observable<EntityResponseType> {
        return this.http.post<any>(this.resourceUrl, item,
            {observe: 'response'}).pipe(
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


    createItem(item: IArticle): Observable<EntityResponseType> {
        return this.http.post<IArticle>(this.resourceUrl, item, {observe: 'response'}).pipe(
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

    checkProductExists(name: string) {
        return this.http.get(`${this.resourceUrl}/checkName/${name}`);
    }

    checkReference(name: string) {
        return this.http.get(`${this.resourceUrl}/checkReference/${name}`);
    }

// checkReference
    numberOfDisplayedArticles(): any {
        return this.http.get(`${this.resourceUrl}/numberOfDisplayedArticles`);
    }

    update(item: any): Observable<EntityResponseType> {
        return this.http.put<IArticle>(this.resourceUrl, item, {observe: 'response'}).pipe(
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

    update2(item: any): Observable<EntityResponseType> {
        return this.http.put<IArticle>(`${this.resourceUrl}/update2`, item, {observe: 'response'}).pipe(
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

    updateEshop(item: any): Observable<EntityResponseType> {
        return this.http.put<IArticle>(this.resourceUrl_eshop, item, {observe: 'response'}).pipe(
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

    articlesWithItemsFiltredByPriceCategory(item): Observable<EntityArrayResponseType_2> {
        return this.http.post<any>(`${this.resourceUrl}/articlesWithItemsFiltredByPriceCategory`, item, {observe: 'response'}).pipe(
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

    refArticle() {
        return this.http.get<any>(`${this.resourceUrl}/proposeReference`, {observe: 'response'});
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IArticle>(`${this.resourceUrl}/${id}`, {observe: 'response'}).pipe(
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

    articleWithItems(id: number): Observable<EntityResponseType> {
        return this.http.get<IArticle>(`${this.resourceUrl}/articleWithItems/${id}`, {observe: 'response'}).pipe(
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

    findArticleVariantsVariantValues(id: number): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl}/findArticleVariantsVariantValues/${id}`, {observe: 'response'}).pipe(
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

    displayArticleInShop(id: number): Observable<EntityResponseType> {
        return this.http.get<IArticle>(`${this.resourceUrl}/displayArticleInShop/${id}`, {observe: 'response'}).pipe(
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


    findbyArticle(id: number): Observable<EntityResponseType> {
        return this.http.get<IArticle>(`${this.resourceUrl}/itemsOfArticle/${id}`, {observe: 'response'}).pipe(
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
        return this.http.get<IArticle[]>(this.resourceUrl, {params: options, observe: 'response'}).pipe(
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


    changePricesItems(config): Observable<any> {
        return this.http.post<any>(`${this.resourceUrl}/changePricesItems`, config).pipe(
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

    queryArticleWithItems(req?: any): Observable<EntityArrayResponseType_2> {
        const options = createRequestOption(req);
        return this.http.get<ListArticleWithItem[]>(`${this.resourceUrl}/articlesWithItems`,
            {params: options, observe: 'response'}).pipe(
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

    articlesWithItemsWithEshopPrice(req?: any): Observable<EntityArrayResponseType_2> {
        const options = createRequestOption(req);
        return this.http.get<ListArticleWithItem[]>(`${this.resourceUrl}/articlesWithItemsWithEshopPrice`,
            {params: options, observe: 'response'}).pipe(
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

    articlesOfVariantValue(name: string, req?: any): Observable<EntityArrayResponseType_2> {
        const options = createRequestOption(req);
        return this.http.get<ListArticleWithItem[]>(`${this.resourceUrl}/articlesOfVariantValue/${name}`,
            {params: options, observe: 'response'}).pipe(
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

    // queryArticleWithItemsEshop(req?: any): Observable<EntityArrayResponseType_2> {
    //     const options = createRequestOption(req);
    //     return this.http.get<ListArticleWithItem[]>(`${this.resourceUrl_eshop}/articlesWithItems`,
    //         { params: options, observe: 'response' }).pipe(
    //         catchError(e => {
    //             Swal.fire({
    //                icon: 'info',
    //                  title: 'Network Error',
    //                 text: "the operation couldn't be completed.",
    //             });
    //             return throwError(e);
    //         })
    //     );
    // }

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

    deleteTax(item: any): Observable<HttpResponse<{}>> {
        return this.http.post<any>(`${this.resourceUrl}/deleteTaxItem`, item, {observe: 'response'}).pipe(
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
        return this.http.get<IArticle[]>(this.resourceUrl, {observe: 'response'}).pipe(
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

    getAllPDF() {
        return this.http.get<ListArticleWithItem[]>(`${this.resourceUrl}/articlesWithItemsPdf`, {observe: 'response'}).pipe(
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

    search(attribute: string, req?: any): Observable<EntityArrayResponseType_2> {
        const options = createRequestOption(req);
        return this.http.get<ListArticleWithItem[]>(`${this.resourceUrl}/search/${attribute}`, {params: options, observe: 'response'});
    }

    searchEshop(attribute: string, req?: any): Observable<EntityArrayResponseType_2> {
        const options = createRequestOption(req);
        return this.http.get<ListArticleWithItem[]>(`${this.resourceUrl}/searchEshopManagement/${attribute}`, {
            params: options,
            observe: 'response'
        });
    }

    filterBySubCategories(values: string[], req?: any): Observable<EntityArrayResponseType_2> {
        const options = createRequestOption(req);
        return this.http.post<ListArticleWithItem[]>(`${this.resourceUrl}/articlesWithItemsInSubCategories`, values, {
            params: options,
            observe: 'response'
        });
    }

    filterByMarks(values: string[], req?: any): Observable<EntityArrayResponseType_2> {
        const options = createRequestOption(req);
        return this.http.post<ListArticleWithItem[]>(`${this.resourceUrl}/articlesWithItemsInMarks`, values, {
            params: options,
            observe: 'response'
        });
    }

    filterByMarksCatMinMax(values: string[], valuesMarks: string[], valuesVariants: string[], prices, req?: any): Observable<EntityArrayResponseType_2> {
        const options = createRequestOption(req);
        let marksList = [];
        if (valuesMarks.length === 0) {
            marksList = null;
        } else {
            marksList = valuesMarks;
        }
        let  subCategoriesList = [];
        if (values.length === 0) {
            subCategoriesList = null;
        } else {
            subCategoriesList = values;
        }

        let  variants = [];
        if (valuesVariants.length === 0) {
            variants = null;
        } else {
            variants = valuesVariants;
        }
        const model = {
            variantValueList: variants,
            markList: marksList,
            subCategoryList: subCategoriesList,
            saleUnitPrices: prices
        };
        return this.http.post<ListArticleWithItem[]>(`${this.resourceUrl}/searchFilter`, model, {params: options, observe: 'response'});
    }


    articlesWithItemsFiltredByPriceCategoryCategoryMark(values: string[], valuesMarks: string[], selectedPrice: any, req?: any): Observable<EntityArrayResponseType_2> {
        const options = createRequestOption(req);
        let marksList = [];
        if (valuesMarks.length === 0) {
            marksList = null;
        } else {
            marksList = valuesMarks;
        }
        let  subCategoriesList = [];
        if (values.length === 0) {
            subCategoriesList = null;
        } else {
            subCategoriesList = values;
        }


        const model = {
            markList: marksList,
            categoryList: subCategoriesList,
            priceCategory: selectedPrice
        };
        return this.http.post<ListArticleWithItem[]>(`${this.resourceUrl}/articlesWithItemsFiltredByPriceCategoryCategoryMark`, model, {params: options, observe: 'response'});
    }

    articlesOfMinMaxPrice(min, max, req?: any): Observable<EntityArrayResponseType_2> {
        const options = createRequestOption(req);
        const model = {
            saleUnitPrice1: min,
            saleUnitPrice2: max
        };
        return this.http.post<ListArticleWithItem[]>(`${this.resourceUrl}/articlesWithInIntervalSalePrice`, model, {
            params: options,
            observe: 'response'
        });
    }
}
