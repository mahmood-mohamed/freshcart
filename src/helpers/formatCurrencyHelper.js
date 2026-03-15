export function formatCurrency(amount, locale = "en-US", currency = "EGP") {
  if (amount == null || isNaN(amount)) {
    return "Invalid amount";
  }

  return amount.toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
}


