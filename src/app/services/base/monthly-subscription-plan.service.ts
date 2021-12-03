import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMonthlySubscriptionPlan } from 'app/shared/models/base/monthly-subscription-plan.model';

type EntityResponseType = HttpResponse<IMonthlySubscriptionPlan>;
type EntityArrayResponseType = HttpResponse<IMonthlySubscriptionPlan[]>;

@Injectable({ providedIn: 'root' })
export class MonthlySubscriptionPlanService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/monthly-subscription-plans';

  constructor(protected http: HttpClient) {}

  create(monthlySubscriptionPlan: IMonthlySubscriptionPlan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(monthlySubscriptionPlan);
    return this.http
      .post<IMonthlySubscriptionPlan>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(monthlySubscriptionPlan: IMonthlySubscriptionPlan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(monthlySubscriptionPlan);
    return this.http
      .put<IMonthlySubscriptionPlan>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMonthlySubscriptionPlan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMonthlySubscriptionPlan[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(monthlySubscriptionPlan: IMonthlySubscriptionPlan): IMonthlySubscriptionPlan {
    const copy: IMonthlySubscriptionPlan = Object.assign({}, monthlySubscriptionPlan, {
      startDate:
        monthlySubscriptionPlan.startDate && monthlySubscriptionPlan.startDate.isValid()
          ? monthlySubscriptionPlan.startDate.toJSON()
          : undefined,
      endDate:
        monthlySubscriptionPlan.endDate && monthlySubscriptionPlan.endDate.isValid() ?
            monthlySubscriptionPlan.endDate.toJSON() : undefined,
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
      res.body.forEach((monthlySubscriptionPlan: IMonthlySubscriptionPlan) => {
        monthlySubscriptionPlan.startDate = monthlySubscriptionPlan.startDate ?
            moment(monthlySubscriptionPlan.startDate) : undefined;
        monthlySubscriptionPlan.endDate = monthlySubscriptionPlan.endDate ?
            moment(monthlySubscriptionPlan.endDate) : undefined;
      });
    }
    return res;
  }
}
