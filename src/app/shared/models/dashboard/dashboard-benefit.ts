export interface IBenefit {
    total_a_payer?: number;
    total_items_quantity?: number;
    total_benefit_value?: number;
    total_benefit_percent?: number;
    total_ht?: number;
    gain_ht_percent?: any;
    gain_benefit_percent?: number;


}

export class Benefit implements IBenefit {
    constructor(
        total_a_payer?: number,
        total_items_quantity?: number,
        total_benefit_value?: number,
        total_benefit_percent?: number,
        total_ht?: number,
        gain_ht_percent?: number,
        gain_benefit_percent?: number
    ) {

    }
}
