import { ICashierProduct } from '../cashier/cashier-product.model';
import { ICashierReceipt } from '../cashier/cashier-receipt.model';

export interface ICashierReceiptItem {
  id?: number;
  quantity?: number;
  discountRate?: number;
  totalHT?: number;
  totalTVA?: number;
  totaTTC?: number;
  cashierProduct?: ICashierProduct;
  cashierReceipt?: ICashierReceipt;
}

export class CashierReceiptItem implements ICashierReceiptItem {
  constructor(
    public id?: number,
    public quantity?: number,
    public discountRate?: number,
    public totalHT?: number,
    public totalTVA?: number,
    public totaTTC?: number,
    public cashierProduct?: ICashierProduct,
    public cashierReceipt?: ICashierReceipt
  ) {}
}
