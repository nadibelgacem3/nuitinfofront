
import { IInvoiceSubscriptionPlan } from './invoice-subscription-plan.model';
import {ISubscriptionPlan} from "./subscription-plan";

export interface ISubscriptionRenewal {
    id?: string;
    startDate?: any;
    endDate?: any;
    numberOfUsers?: number;
    SubscriptionPlan?: ISubscriptionPlan;
    totalAPayer?: number;
    invoiceSubscriptionPlan?: IInvoiceSubscriptionPlan;
}

export class SubscriptionRenewal implements ISubscriptionRenewal {
    constructor(
        public id?: string,
        public startDate?: any,
        public endDate?: any,
        public numberOfUsers?: number,
        public totalAPayer?: number,
        public invoiceSubscriptionPlan?: IInvoiceSubscriptionPlan,
    ) {}
}
