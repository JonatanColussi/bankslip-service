import { Titulo } from 'modules/titulo';

it('should return an error if intance with invalid bankslip type', () => {
  expect(() => new Titulo('836100000055483500863343933736760093100258416914')).toThrow(
    'invalid instance type',
  );
});

it('should return an error if checksum is invalid', () => {
  expect(() => new Titulo('23793381286000795713695000063305475520000370000')).toThrow(
    'The digitable line has invalid checksum',
  );
});

it.each([
  '33690000090000001004100731323143190290002085742',
  '03399492813698200090709545001027500000000000000',
  '00190000090250038600400684863178390220000048550',
  '21290001192110001210904475617405975870000002000',
])('should parse bankslip properly', digitableLine => {
  expect(new Titulo(digitableLine)).toMatchSnapshot();
});
