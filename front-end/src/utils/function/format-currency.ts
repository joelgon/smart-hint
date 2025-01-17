const formatCurrency = (value: string): string => {
  if (!value) return "";

  const numericString = value.replace(/\D/g, "").padStart(3, "0");

  const numericValue = Number(numericString.slice(0, -2) + "." + numericString.slice(-2));

  return numericValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export default formatCurrency;
