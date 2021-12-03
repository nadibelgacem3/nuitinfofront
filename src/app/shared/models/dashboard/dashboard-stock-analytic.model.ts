export interface IStockAnalytic {
    name?: string;
    percent?: number;

}
export class StockAnalytic implements IStockAnalytic {
    constructor(
        public name?: string,
        public percent?: number,
    ) {}
}
