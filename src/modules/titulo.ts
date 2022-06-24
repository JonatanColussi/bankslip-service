import { BankslipBase } from './bankslip';
import { module10 } from './module';

import { BANKSLIP_TYPES } from '../constants';
import { Bankslip } from '../types';

export class Titulo extends BankslipBase implements Bankslip {
  constructor(protected readonly digitableLine: string) {
    super(digitableLine);
    this.validate();
    this.setAmount();
    this.setBarcode();
    this.setExpirationDate();
  }

  setAmount() {
    const amount = this.digitableLine.substring(37);

    this.formatAmount(amount);
  }

  setBarcode() {
    this.barCode =
      this.digitableLine.substring(0, 4) +
      this.digitableLine.substring(32, 47) +
      this.digitableLine.substring(4, 9) +
      this.digitableLine.substring(10, 20) +
      this.digitableLine.substring(21, 31);
  }

  setExpirationDate() {
    const date = new Date(Date.UTC(1997, 9, 7));
    const days = Number.parseInt(this.digitableLine.substring(33, 37), 10);

    if (Number.isNaN(days) || days === 0) {
      this.expirationDate = undefined;

      return;
    }

    date.setDate(date.getDate() + days);

    const [expirationDate] = date.toISOString().split('T');

    this.expirationDate = expirationDate;
  }

  validate() {
    if (this.type !== BANKSLIP_TYPES.TITULO) {
      throw new Error('invalid instance type');
    }

    const blocks = [
      {
        block: this.digitableLine.substring(0, 9),
        dv: this.digitableLine.substring(9, 10),
      },
      {
        block: this.digitableLine.substring(10, 20),
        dv: this.digitableLine.substring(20, 21),
      },
      {
        block: this.digitableLine.substring(21, 31),
        dv: this.digitableLine.substring(31, 32),
      },
    ];

    if (!blocks.every(item => module10(item.block) === Number(item.dv))) {
      throw new Error('The digitable line has invalid checksum');
    }
  }
}
