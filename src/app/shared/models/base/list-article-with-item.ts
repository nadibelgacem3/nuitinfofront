import {IArticle} from "./article";
import {IItem} from "./item.model";


export interface ListArticleWithItem {
    article?: IArticle;
    hideme?: boolean;
    itemList?: IItem[];
}

export interface SearchResultListArticleWithItem {
    tables: ListArticleWithItem[];
    hideme?: boolean;
    total: number;
}
