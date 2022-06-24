import { Convenio } from 'modules/convenio';

it('should return an error if intance with invalid bankslip type', () => {
  expect(() => new Convenio('00190000090250038600400684863178390220000048550')).toThrow(
    'invalid instance type',
  );
});

it.each([
  '836200000005667800481800180975657313001589636081',
  '848900000002404201622015809051904292586034111220',
])('should return an error if checksum is invalid', digitableLine => {
  expect(() => new Convenio(digitableLine)).toThrow('The digitable line has invalid checksum');
});

it.each([
  '826100000015165011000008010000870633442022069557',
  '836100000055483500863343933736760093100258416914',
  '846500000001749900791007011198559871921070373342',
  '848900000002404201622015806051904292586034111220',
  '858000000070438403281922630720192528304729600523',
  '817700000000010936599702411310797039001433708318',
])('should parse bankslip properly', digitableLine => {
  expect(new Convenio(digitableLine)).toMatchSnapshot();
});
