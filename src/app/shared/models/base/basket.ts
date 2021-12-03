import {IItem} from '../base/item.model';
import {Delivery} from "./delivery";

export interface IBillOperationEshop {
    id: string;
    reference?: string;
    status?: string;
    type?: string;
    date?: any;
    dueDate?: any;
    note?: string;
    isInvoice?: boolean;
    isPanier?: boolean;
    isCommand?: boolean;
    totalHT?: number;
    totalTTC?: number;
    totalAPayer?: number;
    billOperationItemEshops?: IBillOperationItemEshop[];
    taxInvoiceBillOperations?: any;
    basesTva?: any;
    pdf?: string;
    avatarPdf?: string;
    clientId: string;
    clientName: string;
    address: string;
    phone: string;
    email: string;
    shippingConfig: any;
    paymentEshop: PaymentEshop;

}

export interface IBillOperationItemEshop {
    id: string;
    quantity?: number;
    discountRate?: number;
    tva?: number;
    unitPrice?: number;
    item?: IItem;
    totalHT?: number;
    totalTTC?: number;
    billOperationEshops?: BillOperationEshop;
}

export interface SearchResultListICommand {
    tables: BillOperationEshop[];
    total: number;
}

export class BillOperationEshop implements IBillOperationEshop {
    id: string;
    reference?: string;
    status?: string;
    type?: string;
    date?: any;
    dueDate?: any;
    note?: string;
    isInvoice?: boolean;
    isPanier?: boolean;
    isCommand?: boolean;
    totalHT?: number;
    totalTTC?: number;
    totalAPayer?: number;
    billOperationItemEshops?: IBillOperationItemEshop[];
    taxInvoiceBillOperations?: any;
    basesTva?: any;
    pdf?: string;
    avatarPdf?: string;
    clientId: string;
    clientName: string;
    address: string;
    phone: string;
    email: string;
    shippingConfig: any;
    paymentEshop: PaymentEshop;
}
export interface PaymentEshop {
    amount: number;
    avatar: string;
    bank: string;
    bankTransfert: string;
    details: string;
    id: string;
    imageJustif: string;
    isCard: boolean;
    isCash: boolean;
    isD17: boolean;
    isBankTransfert: boolean;
    paymentDate: any;
    transferInformation: string;
}

