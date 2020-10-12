const formatValue = (value) =>
  Intl.NumberFormat('pt-BR', {
    style: 'decimal',
  }).format(value);

export default formatValue;
