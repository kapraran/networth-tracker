/**
 * Formats a numeric value as a currency string with optional currency symbol.
 * @param {number} amount - The numeric value to be formatted as currency.
 * @param {string} currency - Optional currency symbol.
 * @returns {string} - Formatted currency string.
 */
export function formatCurrency(amount: number, currency?: string): string {
  const moneyStr = "" + amount;

  return (
    Array.from(moneyStr)
      .flatMap((c, i) =>
        (moneyStr.length - i) % 3 === 0 && i !== 0 ? [".", c] : c
      )
      .join("") + ` ${currency || ""}`
  ).trim();
}
