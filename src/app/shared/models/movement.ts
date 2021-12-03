import {Moment} from 'moment';

export class Movement {
  type?: string;
  quantity?: number;
  reason?: string;
  date?: Moment;
  billID?: string;
  constructor() {
  }

}
