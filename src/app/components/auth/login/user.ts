


export interface IUser {
  id?: any;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: string[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  password?: string;
  byPhone?: boolean;
  userModules?: any;
  pays?: any;

}

export interface SearchResultIUser {
  tables: IUser[];
  total: number;
}

export class User implements IUser {
  constructor(
    public id?: any,
    public login?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public activated?: boolean,
    public langKey?: string,
    public authorities?: string[],
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public password?: string,
    public phone?: string,
    public  userModules?: any,
    public byPhone?: boolean,
    public pays?: any,
  ) {
  }


}


export class CompanyUser implements IUser {
  constructor(

    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public activated?: boolean,
    public langKey?: string,
    public authorities?: string[],
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public password?: string,
    public phone?: string,
    public companyName?: string,
    public  userModules?: any,
    public byPhone?: boolean,
    public  uuidCompany?: string,
    public activityCompany?: string,
    public  pays?: any,

  ) {
  }
 }
export interface ISchema {
  name?: string;
  uuidCompany?: string;
  commercialRegister?: any;
  companyLocation?: any;
  email1?: string;
  email2?: string;
  phone1?: string;
  phone2?: string;
  activity?: string;
  currencyUnitCompany?: any;

}
