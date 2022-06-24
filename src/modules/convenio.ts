import { BankslipBase } from './bankslip';
import { module10, module11 } from './module';

import { BANKSLIP_TYPES } from '../constants';
import { Bankslip } from '../types';

export class Convenio extends BankslipBase implements Bankslip {
  constructor(protected readonly digitableLine: string) {
    super(digitableLine);
    this.validate();
    this.setAmount();
    this.setBarcode();
    this.setExpirationDate();
  }

  setAmount() {
    const reference = Number(this.digitableLine.substring(2, 3));
    const hasAmount = [6, 8].includes(reference);

    if (!hasAmount) {
      this.amount = undefined;

      return;
    }

    const amount = [...this.digitableLine];

    amount.splice(11, 1);

    this.formatAmount(amount.join('').substring(4, 15));
  }

  setBarcode() {
    const barcode = [...this.digitableLine];

    barcode.splice(11, 1);
    barcode.splice(22, 1);
    barcode.splice(33, 1);
    barcode.splice(44, 1);

    this.barCode = barcode.join('');
  }

  setExpirationDate() {
    this.expirationDate = undefined;
  }

  validate() {
    if (this.type !== BANKSLIP_TYPES.CONVENIO) {
      throw new Error('invalid instance type');
    }

    const reference = Number(this.digitableLine.substring(2, 3));
    const module = [6, 7].includes(reference) ? module10 : module11;

    const blocks = [
      {
        block: this.digitableLine.substring(0, 11),
        dv: this.digitableLine.substring(11, 12),
      },
      {
        block: this.digitableLine.substring(12, 23),
        dv: this.digitableLine.substring(23, 24),
      },
      {
        block: this.digitableLine.substring(24, 35),
        dv: this.digitableLine.substring(35, 36),
      },
      {
        block: this.digitableLine.substring(36, 47),
        dv: this.digitableLine.substring(47, 48),
      },
    ];

    if (!blocks.every(item => module(item.block) === Number(item.dv))) {
      throw new Error('The digitable line has invalid checksum');
    }
  }
}
