/**
 * Utility functions for input masks (money, percentage, etc.)
 */

/**
 * Formats a number as Brazilian Real currency
 * @param value - The number to format
 * @returns Formatted string (e.g., "R$ 1.234,56")
 */
export function formatCurrency(value: number | string): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) return 'R$ 0,00';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numValue);
}

/**
 * Removes currency formatting and returns the numeric value
 * @param value - The formatted string (e.g., "R$ 1.234,56")
 * @returns Numeric value
 */
export function parseCurrency(value: string): number {
  if (!value) return 0;

  // Remove R$, spaces, and dots (thousands separator), replace comma with dot
  const cleaned = value
    .replace(/R\$/g, '')
    .replace(/\s/g, '')
    .replace(/\./g, '')
    .replace(',', '.');

  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Masks input as currency while typing
 * @param value - Current input value
 * @returns Masked value
 */
export function maskCurrency(value: string): string {
  if (!value) return '';

  // Remove all non-digits
  const onlyDigits = value.replace(/\D/g, '');

  // Convert to number (considering cents)
  const numValue = parseFloat(onlyDigits) / 100;

  if (isNaN(numValue)) return '';

  return formatCurrency(numValue);
}

/**
 * Formats a number as percentage
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string (e.g., "12,34%")
 */
export function formatPercentage(value: number | string, decimals: number = 2): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) return '0%';

  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(numValue / 100);
}

/**
 * Removes percentage formatting and returns the numeric value
 * @param value - The formatted string (e.g., "12,34%")
 * @returns Numeric value
 */
export function parsePercentage(value: string): number {
  if (!value) return 0;

  // Remove %, spaces, replace comma with dot
  const cleaned = value
    .replace(/%/g, '')
    .replace(/\s/g, '')
    .replace(',', '.');

  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Masks input as percentage while typing
 * @param value - Current input value
 * @param decimals - Number of decimal places (default: 2)
 * @returns Masked value
 */
export function maskPercentage(value: string, decimals: number = 2): string {
  if (!value) return '';

  // Remove all non-digits and non-comma/dot
  let cleaned = value.replace(/[^\d,\.]/g, '');

  // Replace dot with comma for Brazilian format
  cleaned = cleaned.replace('.', ',');

  // Ensure only one comma
  const parts = cleaned.split(',');
  if (parts.length > 2) {
    cleaned = parts[0] + ',' + parts.slice(1).join('');
  }

  // Limit decimal places
  if (parts.length === 2 && parts[1].length > decimals) {
    cleaned = parts[0] + ',' + parts[1].substring(0, decimals);
  }

  return cleaned ? cleaned + '%' : '';
}

/**
 * Formats a number with Brazilian thousand separators
 * @param value - The number to format
 * @returns Formatted string (e.g., "1.234.567")
 */
export function formatNumber(value: number | string): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) return '0';

  return new Intl.NumberFormat('pt-BR').format(numValue);
}

/**
 * Event handler for currency input fields
 * Usage: onChange={handleCurrencyChange(field.onChange)}
 */
export function handleCurrencyChange(onChange: (value: number) => void) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskCurrency(e.target.value);
    const numericValue = parseCurrency(masked);

    // Update display value
    e.target.value = masked;

    // Update form value with numeric value
    onChange(numericValue);
  };
}

/**
 * Event handler for percentage input fields
 * Usage: onChange={handlePercentageChange(field.onChange)}
 */
export function handlePercentageChange(onChange: (value: number) => void, decimals: number = 2) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskPercentage(e.target.value, decimals);
    const numericValue = parsePercentage(masked);

    // Update display value
    e.target.value = masked;

    // Update form value with numeric value
    onChange(numericValue);
  };
}
