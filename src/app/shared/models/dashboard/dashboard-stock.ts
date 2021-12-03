export interface IStock {
    total_marks?: number;
    total_items?: number;
    total_categories?: number;
    total_sub_categories?: number;

}
export class Stock implements IStock {
    constructor(
        public total_marks?: number,
        public total_items?: number,
        public total_categories?: number,
        public total_sub_categories?: number,
    ) {}
}
