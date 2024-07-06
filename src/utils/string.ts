export function formatToBRL(value: string): string {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) {
    throw new Error("Invalid number format");
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numericValue);
}
