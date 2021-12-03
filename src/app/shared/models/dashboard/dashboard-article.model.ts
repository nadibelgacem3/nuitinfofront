export interface IRealVirtualStock {
    real_purchase_price_items?: number;
    real_quantity_items?: number;
    real_sale_price_items?: number;
    virtual_purchase_price_items?: number;
    virtual_quantity_items?: number;
    virtual_sale_price_items?: number;
    eshop_purchase_price_items?: number;
    eshop_sale_price_items?: number;
    eshop_quantity_items?: number;

}

export class RealVirtualStock implements IRealVirtualStock {
    constructor(
        real_purchase_price_items?: number,
        real_quantity_items?: number,
        real_sale_price_items?: number,
        virtual_purchase_price_items?: number,
        virtual_quantity_items?: number,
        virtual_sale_price_items?: number,
    ) {

    }
}
