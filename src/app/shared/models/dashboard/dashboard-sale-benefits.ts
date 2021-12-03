export interface ISaleBenefit {
    total_a_payer?: number;
    total_items_quantity?: number;
    total_ht?: number;
    gain_ht_percent?: number;
}

export class SaleBenefit implements ISaleBenefit {
    constructor(
        public total_a_payer?: number,
        public total_items_quantity?: number,
        public total_ht?: number,
        gain_ht_percent?: number
    ) {
    }
}
