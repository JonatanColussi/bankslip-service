import { module10, module11 } from 'modules/module';

it.each([
  ['001900000', 9],
  ['0250038600', 4],
  ['0068486317', 8],
  ['033994928', 1],
  ['3698200090', 7],
  ['0954500102', 7],
  ['336900000', 9],
  ['0000001004', 1],
  ['0073132314', 3],
  ['212900011', 9],
  ['2110001210', 9],
  ['0447561740', 5],
])('should calculates the verification digit properly with module10', (block, dv) => {
  expect(module10(block)).toBe(dv);
});

it.each([
  ['84890000000', 2],
  ['40420162201', 5],
  ['80605190429', 2],
  ['58603411122', 0],
  ['85800000007', 0],
  ['43840328192', 2],
  ['63072019252', 8],
  ['30472960052', 3],
  ['84891280553', 1],
  ['85591232898', 1],
])('should calculates the verification digit properly with module11', (block, dv) => {
  expect(module11(block)).toBe(dv);
});
