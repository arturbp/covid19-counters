export function numberMask(value: string) {
  if (!value || value === 'undefined' || value.length < 3) return value
  const res = value.split('')
  const array = [];
  let numbers = '';
  let separator = res.length - 1;
  while (separator > 0) {
    array.push(`${res[separator - 2] || ''}${res[separator - 1] || ''}${res[separator] || ''}`);
    if (separator <= 3) array.push(`${res[separator - 4] || ''}${res[separator - 3] || ''}`);
    separator = separator - 3;
  };
  numbers = array.reverse().join('.');
  if (separator % 3 !== 0) numbers = numbers.replace('.', '');

  return numbers;
};