import { ICompany, Company } from './company.model';

export interface ITax {
  id?: number;
  name?: string;
  isValued?: boolean;
  isPercentage?: boolean;
  value?: number;
  company?: ICompany;
}

export class Tax implements ITax {
  constructor(
    public id?: number,
    public name?: string,
    public isValued?: boolean,
    public isPercentage?: boolean,
    public value?: number,
    public company?: Company
  ) {
    this.isValued = this.isValued || false;
    this.isPercentage = this.isPercentage || false;
  }
}
