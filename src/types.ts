import { BANKSLIP_TYPES } from './constants';

export type BankslipTypes = keyof typeof BANKSLIP_TYPES;

export interface Bankslip {
  amount?: number;
  barCode?: string;
  expirationDate?: string;
  setAmount(): void;
  setBarcode(): void;
  setExpirationDate(): void;
  type?: BankslipTypes;
  validate(): void;
}
