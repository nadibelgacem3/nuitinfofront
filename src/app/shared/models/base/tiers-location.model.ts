export interface ITiersLocation {
  id?: number;
  localNumber?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  countryName?: string;
  flagContentType?: string;
  flag?: any;
  latitude?: string;
  longitude?: string;
}

export class TiersLocation implements ITiersLocation {
  constructor(
    public id?: number,
    public localNumber?: string,
    public streetAddress?: string,
    public postalCode?: string,
    public city?: string,
    public stateProvince?: string,
    public countryName?: string,
    public flagContentType?: string, public latitude?: string,
    public longitude?: string,
    public flag?: any
  ) {}
}
