export function formatCurrency(amount, locale = "en-US", currency = "EGP") {
  // تحقق من أن المبلغ هو قيمة رقمية وصحيحة
  if (amount == null || isNaN(amount)) {
    return "Invalid amount";  // أو يمكن أن تُرجع قيمة افتراضية مثل "N/A" أو "غير صالح"
  }

  // تحويل المبلغ إلى تنسيق العملة المطلوب
  return amount.toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
}


// Format to Arabic
// export function formatCurrency(amount, locale = "ar-AR", currency = "EGP") {
//     return amount.toLocaleString(locale, {
//       style: "currency",
//       currency: currency,
//     });
// }

