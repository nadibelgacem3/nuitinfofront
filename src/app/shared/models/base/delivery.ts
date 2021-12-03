import {IBillOperationEshop} from "./basket";

export class Delivery {
    id: any;
    date: any;
    description: string;
    designation: string;
    status: string;
    billOperationEshop: IBillOperationEshop;
}
export interface SearchResultListDelivery {
    tables: Delivery[];
    total: number;
}
