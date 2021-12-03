import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";

import {SERVER_API_URL} from "../../app.constants";
import {Observable, throwError} from "rxjs";
import {createRequestOption} from "../../shared/util/request-util";
import {ITVA} from "../../shared/models/base/tva";
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";

type EntityResponseType = HttpResponse<ITVA>;
type EntityArrayResponseType = HttpResponse<ITVA[]>;

@Injectable({
  providedIn: 'root'
})

export class TvaService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/tva-configs';

  constructor(protected http: HttpClient) {
  }

  create(tva: ITVA): Observable<EntityResponseType> {
    return this.http.post<ITVA>(this.resourceUrl, tva, {observe: 'response'}).pipe(
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

  update(tva: ITVA): Observable<EntityResponseType> {
    return this.http.put<ITVA>(this.resourceUrl, tva, {observe: 'response'}).pipe(
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
    return this.http.get<ITVA>(`${this.resourceUrl}/${id}`, {observe: 'response'}).pipe(
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
    return this.http.get<ITVA[]>(this.resourceUrl, {params: options, observe: 'response'}).pipe(
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
