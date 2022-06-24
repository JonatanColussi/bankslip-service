import { BANKSLIP_TYPES } from '../constants';
import { BankslipTypes } from '../types';

export class BankslipBase {
  amount?: number;
  barCode?: string;
  expirationDate?: string;
  type?: BankslipTypes;

  constructor(protected readonly digitableLine: string) {
    this.validateDigitableLine();
    this.setBankslipType();
  }

  protected formatAmount(amount: string) {
    const integer = amount.substring(0, amount.length - 2);
    const cents = amount.slice(-2);

    this.amount = Number.parseFloat(`${integer}.${cents}`) || undefined;
  }

  private setBankslipType() {
    this.type = this.digitableLine.startsWith('8')
      ? BANKSLIP_TYPES.CONVENIO
      : BANKSLIP_TYPES.TITULO;
  }

  private validateDigitableLine() {
    if (!/^\d{47,48}$/.test(this.digitableLine)) {
      throw new Error('The digitable line must contains only numbers');
    }
  }
}
