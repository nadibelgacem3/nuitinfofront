
export interface IMark {
    id?: number;
    nameConfigTranslated?: string;

}

export class Mark implements IMark {
    constructor(public id?: number, public name?: string) {}
}
