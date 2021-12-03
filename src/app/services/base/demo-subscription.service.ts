import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared/util/request-util';
import {IAnnualSubscriptionPlan} from "../../shared/models/base/annual-subscription-plan.model";


type EntityResponseType = HttpResponse<IAnnualSubscriptionPlan>;
type EntityArrayResponseType = HttpResponse<IAnnualSubscriptionPlan[]>;

@Injectable({
  providedIn: 'root'
})
export class DemoSubscriptionService {
  public resourceUrl = SERVER_API_URL + 'api/demo-subscription-plans';

  constructor(protected http: HttpClient) {}

  create(annualSubscriptionPlan: IAnnualSubscriptionPlan): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(annualSubscriptionPlan);
    return this.http
        .post<IAnnualSubscriptionPlan>(this.resourceUrl, annualSubscriptionPlan, { observe: 'response' });
  }

  update(annualSubscriptionPlan: IAnnualSubscriptionPlan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(annualSubscriptionPlan);
    return this.http
        .put<IAnnualSubscriptionPlan>(this.resourceUrl, copy, { observe: 'response' })
        .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
        .get<IAnnualSubscriptionPlan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
        .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
        .get<IAnnualSubscriptionPlan[]>(this.resourceUrl, { params: options, observe: 'response' })
        .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(annualSubscriptionPlan: IAnnualSubscriptionPlan): IAnnualSubscriptionPlan {
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

  checkDemoExists(id) {
    return this.http.get(`${this.resourceUrl}/checkDemoOfCompany/${id}`);
  }
}
