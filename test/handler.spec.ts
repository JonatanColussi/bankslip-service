import createEvent from '@serverless/event-mocks';

import { viewBankslipInfo } from '../src/handler';

it.each([
  '21290001192110001210904475617405975870000002000',
  '826100000015165011000008010000870633442022069557',
  '33690000090000001004100731323143190290002085742',
  '03399492813698200090709545001027500000000000000',
  '00190000090250038600400684863178390220000048550',
  '836100000055483500863343933736760093100258416914',
  '846500000001749900791007011198559871921070373342',
  '848900000002404201622015806051904292586034111220',
  '858000000070438403281922630720192528304729600523',
])('should parse digitableLine properly', async digitableLine => {
  const response = await viewBankslipInfo(
    createEvent('aws:apiGateway', {
      pathParameters: { digitableLine },
    } as any),
    {} as any,
    {} as any,
  );

  if (!response) {
    return;
  }

  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.body)).toMatchSnapshot();
});

it.each(['1234567890', 'abcde', 'AB1234', undefined])(
  'should return error if digitable line is invalid',
  async digitableLine => {
    const response = await viewBankslipInfo(
      createEvent('aws:apiGateway', {
        pathParameters: { digitableLine },
      } as any),
      {} as any,
      {} as any,
    );

    if (!response) {
      return;
    }

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual({
      message: 'The digitable line must contains only numbers',
    });
  },
);

it('should return an error if call handler with empty event', async () => {
  const response = await viewBankslipInfo({} as any, {} as any, {} as any);

  if (!response) {
    return;
  }

  expect(response.statusCode).toBe(400);
  expect(JSON.parse(response.body)).toEqual({
    message: 'The digitable line must contains only numbers',
  });
});
