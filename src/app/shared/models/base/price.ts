
export interface IPrice {
    id?: number;
    name?: string;
    isActivated?: boolean;
    isDefault?: boolean;
}

export class Price implements IPrice {
    constructor(public id?: number,
                public name?: string,
                public isActivated?: boolean, public isDefault?: boolean) {

    }
}
