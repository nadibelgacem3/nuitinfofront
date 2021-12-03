
import {IValueVariant} from "./value-variant";


export interface IVariant {
    id?: string;
    isActivated?: boolean;
    nameConfig?: string;
    nameConfigTranslated?: string;
    variantValueConfigs?: IValueVariant[];
}

export interface SearchResultIItem {
    tables: IVariant[];
    total: number;
}

export class Variant implements IVariant {
    constructor(
        public isActivated?: boolean,
        public variantValueConfigs?: IValueVariant[]
    ) {

    }
}
