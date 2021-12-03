import { Moment } from 'moment';
import { ICashierReceiptItem } from '../cashier/cashier-receipt-item.model';
import { ICashierReceiptPay } from '../cashier/cashier-receipt-pay.model';
import { ICashier } from '../cashier/cashier.model';
import { ICashierCostumer } from '../cashier/cashier-costumer.model';
import { CashierReceiptStatusEnum } from '../../enumerations/cashier-receipt-status-enum.model';

export interface ICashierReceipt {
  id?: number;
  number?: string;
  reference?: string;
  status?: CashierReceiptStatusEnum;
  totalHT?: number;
  totalTVA?: number;
  totaTTC?: number;
  date?: Moment;
  dueDate?: Moment;
  isConverted?: boolean;
  withTVA?: boolean;
  withTax?: boolean;
  cashierReceiptItems?: ICashierReceiptItem[];
  cashierReceiptPays?: ICashierReceiptPay[];
  cashier?: ICashier;
  cashierCostumer?: ICashierCostumer;
}

export class CashierReceipt implements ICashierReceipt {
  constructor(
    public id?: number,
    public number?: string,
    public reference?: string,
    public status?: CashierReceiptStatusEnum,
    public totalHT?: number,
    public totalTVA?: number,
    public totaTTC?: number,
    public date?: Moment,
    public dueDate?: Moment,
    public isConverted?: boolean,
    public withTVA?: boolean,
    public withTax?: boolean,
    public cashierReceiptItems?: ICashierReceiptItem[],
    public cashierReceiptPays?: ICashierReceiptPay[],
    public cashier?: ICashier,
    public cashierCostumer?: ICashierCostumer
  ) {
    this.isConverted = this.isConverted || false;
    this.withTVA = this.withTVA || false;
    this.withTax = this.withTax || false;
  }
}
