import {IDepot} from './depot.model';

import {TaxItem} from "./tax";
import {IMark} from "./mark";
import {IItemCategory} from "./item-category.model";
import {IVariant} from "./variant";
import {IItem} from "./item.model";
import {IImage} from "./image";


export interface IArticle {
    id?: number;
    reference?: string;
    codeABarre?: string;
    description?: string;
    name?: string;
    totalStockQuantity?: number;
    returnedPrice?: number;
    stocklimit?: number;
    stocklimitAlert?: boolean;
    purchaseUnitPrice?: number;
    purchaseUnitPriceHT?: number;
    saleUnitPrice?: number;
    unitType?: string;
    tva?: number;
    isComposite?: boolean;
    imageContentType?: string;
    stocklimitMax?: number;
    image?: any;
    articleCategory?: IItemCategory;
    depot?: IDepot;
    marque?: IMark;
    taxItems?: TaxItem[];
    hasVariant?: boolean;
    items?: IItem[];
    variants?: IVariant[];
    images?: IImage;
    pivvs?: any;
    benefitValue?: number;
    benefitPercentage?: number;
    deleted?: false;
    totalVirtualQuantity?: number;
    totalShopQuantity?: number;
    fodec?: number;
    isFodec?: boolean;
    articleSubCategory?: any;
    isDisplayedInShop?: boolean;
    sku?: string;
    articleTags?: any[];
    articleItems?: any[];
}

export interface SearchResultIItem {
    tables: IArticle[];
    total: number;
}

export class Article implements IArticle {
    constructor(
        public id?: number,
        public reference?: string,
        public codeABarre?: string,
        public sku?: string,
        public name?: string,
        public totalStockQuantity?: number,
        public stocklimit?: number,
        public stocklimitAlert?: boolean,
        public unitType?: string,
        public articleTags?: any[],
        public tva?: number,
        public imageContentType?: string,
        public image?: any,
        public description?: string,
        public articleItems?: any[],
        public articleCategory?: IItemCategory,
        public depot?: IDepot,
        public marque?: IMark,
        public taxItems?: any[],
        public hasVariant?: boolean,
        public items?: IItem[],
        public variants?: IVariant[],
        public images?: IImage,
        public benefitValue?: number,
        public benefitPercentage?: number,
        public totalVirtualQuantity?: number,
        public totalShopQuantity?: number,
        public fodec?: number,
        public isFodec?: boolean,
        public articleSubCategory?: any,
        public deleted?: false,
        public isDisplayedInShop?: boolean,
    ) {
        this.stocklimitAlert = this.stocklimitAlert || false;
    }
}
