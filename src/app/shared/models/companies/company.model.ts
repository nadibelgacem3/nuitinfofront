import {  CompanyBankAccount } from '../companies/company-bank-account.model';
import { ICompanyLocation } from './company-location.model';
import { CompanyBusinessTypeEnum } from '../enumerations/company-business-type-enum.model';

export interface ICompany {
  id?: number;
  name?: string;
  logoContentType?: string;
  logo?: any;
  phone1?: string;
  phone2?: string;
  fax?: string;
  email1?: string;
  email2?: string;
  description?: string;
  businessType?: CompanyBusinessTypeEnum;
  currencyUnit?: string;
  currencyQuotient?: number;
  commercialRegister?: string;
  isActivated?: boolean;
  themeColor?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  companyBankAccount?: CompanyBankAccount;
  companyLocation?: ICompanyLocation;
}

export class Company implements ICompany {
  constructor(
    public id?: number,
    public name?: string,
    public logoContentType?: string,
    public logo?: any,
    public phone1?: string,
    public phone2?: string,
    public fax?: string,
    public email1?: string,
    public email2?: string,
    public description?: string,
    public businessType?: CompanyBusinessTypeEnum,
    public currencyUnit?: string,
    public currencyQuotient?: number,
    public commercialRegister?: string,
    public isActivated?: boolean,
    public themeColor?: string,
    public facebook?: string,
    public linkedin?: string,
    public twitter?: string,
    public instagram?: string,
    public companyBankAccount?: CompanyBankAccount,
    public companyLocation?: ICompanyLocation,
  ) {
    this.isActivated = this.isActivated || false;
  }
}
