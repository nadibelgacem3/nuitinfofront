import { Moment } from 'moment';
import { ICompanyBillPaymentItem } from './company-bill-payment-item.model';
import { ICompany } from './company.model';

export interface ICompanyModule {
  id?: number;
  name?: string;
  activatedAt?: Moment;
  activatedUntil?: Moment;
  isActivated?: boolean;
  price?: number;
  companyBillPaymentItems?: ICompanyBillPaymentItem[];
  company?: ICompany;
}

export class CompanyModule implements ICompanyModule {
  constructor(
    public id?: number,
    public name?: string,
    public activatedAt?: Moment,
    public activatedUntil?: Moment,
    public isActivated?: boolean,
    public price?: number,
    public companyBillPaymentItems?: ICompanyBillPaymentItem[],
    public company?: ICompany
  ) {
    this.isActivated = this.isActivated || false;
  }
}
