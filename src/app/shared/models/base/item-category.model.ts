export interface IItemCategory {
  id?: number;
  nameConfigTranslated?: string;
  nameConfig?: string;
  description?: string;
  image?: string;
  articleSubCategories?: any[];
}

export class ItemCategory implements IItemCategory {
  constructor(public id?: number, public name?: string, public description?: string) {}
}
