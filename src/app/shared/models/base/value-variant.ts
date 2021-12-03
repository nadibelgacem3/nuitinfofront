
export interface IValueVariant {
    id?: string;
    nameConfig?: string;
    nameConfigTranslated?: string;
    configVariant?: any;

}

export class ValueVariant implements IValueVariant {
    constructor(public id?: string, public name?: string, public  configVariant?: any) {}
}
