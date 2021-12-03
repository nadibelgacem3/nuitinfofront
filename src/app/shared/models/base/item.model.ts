
import {IItemPriceCategory} from "./item-price";
import {IArticle} from "./article";


export interface IItem {
    id?: number;
    reference?: string;
    name?: string;
    sku?: string;
    stockQuantity?: number;
    purchaseUnitPrice?: number;
    returnedPrice?: number;
    saleUnitPrice?: number;
    benefitValue?: number;
    stocklimit?: number;
    benefitPercentage?: number;
    purchaseUnitPriceHT?: number;
    itemPriceCategories?: IItemPriceCategory[];
    article?: IArticle;
    tva?: number;
    codeABarre?: string;
    stocklimitMax?: number;
    variantValues?: any[];
    imageItems?: any;
    virtualQuantity?: number;
    shopQuantity?: number;
    isFodec?: boolean;
    isDisplayedInShop?: boolean;
    description?: string;
}

export interface SearchResultIItem {
    tables: IItem[];
    total: number;
}

export class Item implements IItem {
    constructor(
        public id?: number,
        public reference?: string,
        public codeABarre?: string,
        public name?: string,
        public stockQuantity?: number,
        public purchaseUnitPrice?: number,
        public   purchaseUnitPriceHT?: number,
        public saleUnitPrice?: number,
        public   benefitValue?: number,
        public benefitPercentage?: number,
        public  variantValues?: any[],
        public itemPriceCategories?: IItemPriceCategory[],
        public imageItems?: any,
        public virtualQuantity?: number,
        public   shopQuantity?: number,
        public isDisplayedInShop?: boolean,
    ) {
    }
}
