import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {createRequestOption} from "../../shared/util/request-util";
import {IArticle} from "../../shared/models/base/article";
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {SERVER_API_URL} from "../../app.constants";
import {HttpClient, HttpResponse} from "@angular/common/http";

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
type EntityResponseType = HttpResponse<any[]>;
export class AddressService {

  public resourceUrl = SERVER_API_URL + 'company-service/api/governments';
  public resourceUrl_2 = SERVER_API_URL + 'company-service/api/delegations';
  constructor(protected http: HttpClient) {}
  query_Governments(req?: any): Observable<EntityResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IArticle[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(
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

  query_Delegations(req?: any): Observable<EntityResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IArticle[]>(this.resourceUrl_2, { params: options, observe: 'response' }).pipe(
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
