export interface ItotalInvoices {
    total_purchase_invoices?: number;
    total_invoices?: number;
    total_sale_invoices?: number;
    gain_total_purchase_invoices_percent?: number;
    gain_total_sale_invoices_percent?: number;
}

export class TotalInvoices implements ItotalInvoices {
    constructor(
        public total_purchase_invoices?: number,
        public total_invoices?: number,
        public total_sale_invoices?: number,
        public gain_total_purchase_invoices_percent?: number,
        public gain_total_sale_invoices_percent?: number
        ) {
    }
}
