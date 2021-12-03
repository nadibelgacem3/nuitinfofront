import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";

import {SERVER_API_URL} from "../../app.constants";
import {Observable, throwError} from "rxjs";
import {createRequestOption} from "../../shared/util/request-util";
import {catchError, map} from "rxjs/operators";
import Swal from "sweetalert2";
import {ISubscriptionPlan} from "../../shared/models/base/subscription-plan";
import {IAnnualSubscriptionPlan} from "../../shared/models/base/annual-subscription-plan.model";
import * as moment from "moment";

type EntityResponseType = HttpResponse<ISubscriptionPlan>;
type EntityArrayResponseType = HttpResponse<ISubscriptionPlan[]>;
type EntityArrayResponseType_2 = HttpResponse<any[]>;
@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlanService {
  public resourceUrl = SERVER_API_URL + 'api/subscription-plans';
    public resourceUrl_2 = SERVER_API_URL + 'api/companies';
    public resourceUrl_3 = SERVER_API_URL + 'api/vochers';
    public resourceUrl_4 = SERVER_API_URL + 'api/packs';
  constructor(protected http: HttpClient) {}

  create(tva: ISubscriptionPlan): Observable<EntityResponseType> {
    return this.http.post<ISubscriptionPlan>(this.resourceUrl, tva, { observe: 'response' }).pipe(
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

  update(tva: ISubscriptionPlan): Observable<EntityResponseType> {
    return this.http.put<ISubscriptionPlan>(this.resourceUrl, tva, { observe: 'response' }).pipe(
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

    checkHostNameExists(email: string) {
        return this.http.get(`${SERVER_API_URL}api/eshop-schema/checkHostName?hostName=${email}`);
    }

    numberOfArticlesOflastEshop(id: string): any {
        return this.http.get(`${this.resourceUrl}/numberOfArticlesOflastEshop/${id}`);
    }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISubscriptionPlan>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
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

    lastSubscriptionPlan(id: number): Observable<EntityResponseType> {

        return this.http.get<ISubscriptionPlan>(`${this.resourceUrl}/lastSubscriptionPlan/${id}`, { observe: 'response' })
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

    findByCompany(id: number): Observable<EntityResponseType> {

        return this.http.get<ISubscriptionPlan>(`${this.resourceUrl_2}/listSubscriptionPlans/${id}`, { observe: 'response' })
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

    modulePays(id: number): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl_2}/modulePays/${id}`, { observe: 'response' }).pipe(
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


    checkVocher(id: string) {
        return this.http.get(`${this.resourceUrl_3}/checkVocherKey/${id}`, { observe: 'response' }).pipe(
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
    return this.http.get<ISubscriptionPlan[]>(this.resourceUrl, { params: options, observe: 'response' }).pipe(
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
    queryPacks(): Observable<any> {
        return this.http.get<any[]>(this.resourceUrl_4, { observe: 'response' }).pipe(
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

    protected convertDateFromClient(annualSubscriptionPlan: ISubscriptionPlan): ISubscriptionPlan {
        const copy: IAnnualSubscriptionPlan = Object.assign({}, annualSubscriptionPlan, {
            startDate:
                annualSubscriptionPlan.startDate && annualSubscriptionPlan.startDate.isValid()
                    ? annualSubscriptionPlan.startDate.toJSON()
                    : undefined,
            endDate:
                annualSubscriptionPlan.endDate && annualSubscriptionPlan.endDate.isValid() ?
                    annualSubscriptionPlan.endDate.toJSON() : undefined,
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.startDate = res.body.startDate ? moment(res.body.startDate) : undefined;
            res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((annualSubscriptionPlan: IAnnualSubscriptionPlan) => {
                annualSubscriptionPlan.startDate = annualSubscriptionPlan.startDate ?
                    moment(annualSubscriptionPlan.startDate) : undefined;
                annualSubscriptionPlan.endDate = annualSubscriptionPlan.endDate ?
                    moment(annualSubscriptionPlan.endDate) : undefined;
            });
        }
        return res;
    }
}
