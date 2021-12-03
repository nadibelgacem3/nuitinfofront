export interface IState {
    itemName?: string;
    stateProvince?: string;
    date?: string;
    itemId?: number;
    totalAPayer?: number;
    totalBeneficePercent?: number;
    totalBeneficeValue?: number;
    totalItemsQuantity?: number;
    totalTTCachat?: number;
    totalHT?: number;

}

export class State implements IState {
    constructor(
        itemName?: string,
        stateProvince?: string,
        date?: string,
        itemId?: number,
        totalAPayer?: number,
        totalBeneficePercent?: number,
        totalBeneficeValue?: number,
        totalItemsQuantity?: number,
        totalTTCachat?: number,
        totalHT?: number
    ) {
    }
}
