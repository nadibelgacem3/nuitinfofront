import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {SERVER_API_URL, SERVER_API_URL_2} from "../../app.constants";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {createRequestOption} from "../../shared/util/request-util";
import {Delivery} from "../../shared/models/base/delivery";

type EntityResponseType = HttpResponse<Delivery>;
type EntityArrayResponseType = HttpResponse<Delivery[]>;

@Injectable({
    providedIn: 'root'
})
export class DeliveryService {
    public resourceUrl = SERVER_API_URL + 'company-service/api/shippings';

    constructor(protected http: HttpClient) {
    }

    create(tva: Delivery): Observable<EntityResponseType> {
        return this.http.post<any>(this.resourceUrl, tva, {observe: 'response'}).pipe(
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

    update(tva: Delivery): Observable<EntityResponseType> {
        return this.http.put<any>(this.resourceUrl, tva, {observe: 'response'}).pipe(
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

    changeState(id: number): Observable<EntityResponseType> {
        return this.http.get<any>(`${this.resourceUrl}/${id}`, {observe: 'response'}).pipe(
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

    find(key, req): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<any>(`${this.resourceUrl}/search/${key}`, {params: options, observe: 'response'}).pipe(
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


    queryPdf(): Observable<EntityArrayResponseType> {
        return this.http.get<any[]>(`${this.resourceUrl}/pdf`, {  observe: 'response' }).pipe(
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
        return this.http.get<any[]>(this.resourceUrl, {params: options, observe: 'response'}).pipe(
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
}
