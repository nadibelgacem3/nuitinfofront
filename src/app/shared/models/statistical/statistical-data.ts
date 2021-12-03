import {Moment} from 'moment';

export interface IStatData {
    date?: Moment;
    itemId?: number;
    itemName?: string;
    stateProvince?: string;
    totalAPayer?: number;
    totalBeneficePercent?: number;
    totalBeneficeValue?: number;
    totalItemsQuantity?: number;
    totalTTCachat?: number;
    totalHT?: number;
    numberOfDoc?: number;
    }

export class StatData implements IStatData {
    constructor(
        public   date?: Moment,
        public itemId?: number,
        public itemName?: string,
        public stateProvince?: string,
        public  totalAPayer?: number,
        public  totalBeneficePercent?: number,
        public  totalBeneficeValue?: number,
        public  totalItemsQuantity?: number,
        public  totalTTCachat?: number,
        public totalHT?: number
    ) {
    }
}
