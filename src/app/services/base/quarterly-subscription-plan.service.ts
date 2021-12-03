import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IQuarterlySubscriptionPlan } from 'app/shared/models/base/quarterly-subscription-plan.model';

type EntityResponseType = HttpResponse<IQuarterlySubscriptionPlan>;
type EntityArrayResponseType = HttpResponse<IQuarterlySubscriptionPlan[]>;

@Injectable({ providedIn: 'root' })
export class QuarterlySubscriptionPlanService {
  public resourceUrl = SERVER_API_URL + 'company-service/api/quarterly-subscription-plans';

  constructor(protected http: HttpClient) {}

  create(quarterlySubscriptionPlan: IQuarterlySubscriptionPlan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(quarterlySubscriptionPlan);
    return this.http
      .post<IQuarterlySubscriptionPlan>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(quarterlySubscriptionPlan: IQuarterlySubscriptionPlan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(quarterlySubscriptionPlan);
    return this.http
      .put<IQuarterlySubscriptionPlan>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IQuarterlySubscriptionPlan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IQuarterlySubscriptionPlan[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(quarterlySubscriptionPlan: IQuarterlySubscriptionPlan): IQuarterlySubscriptionPlan {
    const copy: IQuarterlySubscriptionPlan = Object.assign({}, quarterlySubscriptionPlan, {
      startDate:
        quarterlySubscriptionPlan.startDate && quarterlySubscriptionPlan.startDate.isValid()
          ? quarterlySubscriptionPlan.startDate.toJSON()
          : undefined,
      endDate:
        quarterlySubscriptionPlan.endDate && quarterlySubscriptionPlan.endDate.isValid()
          ? quarterlySubscriptionPlan.endDate.toJSON()
          : undefined,
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
      res.body.forEach((quarterlySubscriptionPlan: IQuarterlySubscriptionPlan) => {
        quarterlySubscriptionPlan.startDate = quarterlySubscriptionPlan.startDate ?
            moment(quarterlySubscriptionPlan.startDate) : undefined;
        quarterlySubscriptionPlan.endDate = quarterlySubscriptionPlan.endDate ?
            moment(quarterlySubscriptionPlan.endDate) : undefined;
      });
    }
    return res;
  }
}
