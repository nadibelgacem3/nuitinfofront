import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

import {SERVER_API_URL} from '../../app.constants';
import {createRequestOption} from '../../shared/util/request-util';

import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {IMark} from "../../shared/models/base/mark";
import {TranslationMyWayService} from "../translation-my-way.service";

type EntityResponseType = HttpResponse<IMark>;
type EntityArrayResponseType = HttpResponse<IMark[]>;

@Injectable({
    providedIn: 'root'
})
export class MarkService {
    public resourceUrl = SERVER_API_URL + 'company-service/api/marks';

    constructor(protected http: HttpClient, private pipeTranslate: TranslationMyWayService) {
    }

    create(item: any): Observable<EntityResponseType> {
        return this.http.post<IMark>(this.resourceUrl, item, {observe: 'response'}).pipe(
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

    update(item: any): Observable<EntityResponseType> {
        return this.http.put<IMark>(this.resourceUrl, item, {observe: 'response'}).pipe(
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

    checkExists(name: string) {
        return this.http.get(`${this.resourceUrl}/checkNameConfigTranslated/${name}`);
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMark>(`${this.resourceUrl}/${id}`, {observe: 'response'}).pipe(
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
        return this.http.get<IMark[]>(this.resourceUrl, {params: options, observe: 'response'}).pipe(
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

    delete(name: string): Observable<HttpResponse<{}>> {
        return this.http.delete(`${this.resourceUrl}/${name}`, {observe: 'response'}).pipe(
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
}
