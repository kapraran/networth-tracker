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
      .join("") + `${currency || ""}`
  ).trim();
}

/**
 * Throttles a given function, ensuring it's not called more frequently than the specified delay.
 *
 * @param cb - The function to be throttled.
 * @param delay - The minimum time (in milliseconds) that must elapse between two consecutive invocations of the throttled function.
 * @returns A throttled version of the input function.
 */
export function throttle<T extends (...args: any[]) => void>(
  cb: T,
  delay: number
) {
  // Variable to track the time until the next allowed invocation
  let wait = -1;

  // Returning a throttled version of the input function
  return (...args: Parameters<T>) => {
    // If the wait time is still active, skip the invocation
    if (wait >= 0) return;

    // Invoke the original function with the provided arguments
    cb(...args);

    // Set a timeout to reset the wait time after the specified delay
    wait = setTimeout(() => (wait = -1), delay);
  };
}

/**
 * Debounces a given function, ensuring it's not called until a certain delay has passed
 * since the last invocation. If the debounced function is called again within the delay,
 * the timer is reset.
 *
 * @param cb - The function to be debounced.
 * @param delay - The time (in milliseconds) that must elapse after the last invocation
 *                before the debounced function is executed.
 * @returns A debounced version of the input function.
 */
export function debounce<T extends (...args: any[]) => void>(
  cb: T,
  delay: number
) {
  // Variable to store the timer ID for the setTimeout function
  let timer = -1;

  // Returning a debounced version of the input function
  return (...args: Parameters<T>) => {
    // Clear any existing timer to reset the debounce
    clearTimeout(timer);

    // Set a new timer to delay the invocation of the original function
    timer = setTimeout(() => cb(...args), delay);
  };
}
