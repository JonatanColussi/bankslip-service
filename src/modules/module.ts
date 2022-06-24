export function module10(block: string) {
  const segments = [...block].map(n => Number(n)).reverse();

  const totalSum = segments.reduce((acc, current, index) => {
    let sum = current * (((index + 1) % 2) + 1);

    sum = sum > 9 ? Math.trunc(sum / 10) + (sum % 10) : sum;

    return acc + sum;
  }, 0);

  return Math.ceil(totalSum / 10) * 10 - totalSum;
}

export function module11(block: string) {
  const segments = [...block].map(n => Number(n)).reverse();

  let multiplier = 2;
  const totalSum = segments.reduce((acc, current) => {
    const sum = current * multiplier;

    multiplier = multiplier === 9 ? 2 : multiplier + 1;

    return acc + sum;
  }, 0);

  const rest = totalSum % 11;

  if ([0, 1].includes(rest)) {
    return 0;
  }

  if (rest === 10) {
    return 1;
  }

  const DV = 11 - rest;

  return DV;
}
