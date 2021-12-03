import {Moment} from 'moment';

export interface IStatistical {
    startDate?: Moment;
    endDate?: Moment;
    tiersId?: number;
    itemId?: number;
}

export class IStatistical implements IStatistical {
    constructor(public startDate?: Moment,
                public endDate?: Moment,
                public tiersId?: number,
                public itemId?: number) {
    }
}
