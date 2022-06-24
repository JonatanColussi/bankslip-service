import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';

import { BANKSLIP_TYPES } from './constants';
import { response } from './helpers';
import { BankslipBase, Convenio, Titulo } from './modules';

export const viewBankslipInfo: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = event => {
  try {
    const { digitableLine = '' } = event.pathParameters || {};
    const { type } = new BankslipBase(digitableLine);

    const {
      amount = null,
      barCode,
      expirationDate = null,
    } = type === BANKSLIP_TYPES.CONVENIO ? new Convenio(digitableLine) : new Titulo(digitableLine);

    return response({
      amount,
      barCode,
      expirationDate,
    });
  } catch (error: any) {
    return response({ message: error?.message }, 400);
  }
};
