const formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

export const numberToCurrency = (value: number) => formatter.format(value);

export const formatMoney = (
  value: string | number = 0,
  hasCurrency = true,
  currency = '',
) =>
  `$${Number(value)
    .toFixed(2)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}${
    hasCurrency ? ' ' + currency : ''
  }`;
