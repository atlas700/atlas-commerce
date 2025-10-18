const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}

const weightFormatter = new Intl.NumberFormat("en", {
  style: "unit",
  unit: "kilogram",
  unitDisplay: "short",
  maximumFractionDigits: 2,
});

export function formatWeight(weightInGrams: number) {
  const kilos = weightInGrams / 1000;
  return weightFormatter.format(kilos);
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
});

export function formatDate(date: Date) {
  return dateFormatter.format(date);
}
