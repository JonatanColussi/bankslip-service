import { BankslipBase } from 'modules/bankslip';

it.each([
  ['21290001192110001210904475617405975870000002000', 'TITULO'],
  ['826100000015165011000008010000870633442022069557', 'CONVENIO'],
  ['33690000090000001004100731323143190290002085742', 'TITULO'],
  ['03399492813698200090709545001027500000000000000', 'TITULO'],
  ['00190000090250038600400684863178390220000048550', 'TITULO'],
  ['836100000055483500863343933736760093100258416914', 'CONVENIO'],
  ['846500000001749900791007011198559871921070373342', 'CONVENIO'],
  ['848900000002404201622015806051904292586034111220', 'CONVENIO'],
  ['858000000070438403281922630720192528304729600523', 'CONVENIO'],
])('should define bankslip type properly', (digitableLine, type) => {
  const bankslip = new BankslipBase(digitableLine);

  expect(bankslip.type).toBe(type);
});

it.each(['1234567890', 'abcde', 'AB1234'])(
  'should throw error if digitable line is invalid',
  digitableLine => {
    expect(() => new BankslipBase(digitableLine)).toThrow(
      'The digitable line must contains only numbers',
    );
  },
);
