import { z } from "zod";

export function parseCurrencyInput(raw: string | number): number | null {
  if (raw === null || raw === undefined || raw === "") return null;

  if (typeof raw === "number") {
    return Number.isFinite(raw) ? raw : null;
  }

  let s = String(raw).trim();

  s = s.replace(/\s/g, ""); // remove spaces
  s = s.replace(/^R\$\s?/, ""); // remove leading R$
  s = s.replace(/[^0-9.,()\-]/g, ""); // keep digits, dot, comma, parentheses, minus

  const isParenNegative = /^\(.*\)$/.test(s);
  if (isParenNegative) {
    s = s.replace(/^\(|\)$/g, "");
  }

  const hasComma = s.indexOf(",") !== -1;
  const hasDot = s.indexOf(".") !== -1;

  if (hasComma && hasDot) {
    s = s.replace(/\./g, "");     // remove thousand separators
    s = s.replace(/,/g, ".");     // decimal separator -> dot
  } else if (hasComma && !hasDot) {
    s = s.replace(/,/g, ".");
  } else {
    s = s.replace(/\. (?=\d{3})/g, ""); // unlikely, kept for safety (no-op if no spaces)
    s = s.replace(/(?<=\d)\.(?=\d{3}\b)/g, "");
  }

  const isNegative = s.includes("-");
  s = s.replace(/-/g, "");

  const parsed = parseFloat(s);
  if (Number.isNaN(parsed)) return null;

  return isParenNegative || isNegative ? -parsed : parsed;
}

export const brlNumberSchema = z.preprocess((val) => {
  const n = parseCurrencyInput(val as string | number);
  return n;
}, z.number().refine((n) => Number.isFinite(n), { message: "Invalid currency value" }));

export function formatBRL(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function parseAndFormatBRL(raw: string | number): string {
  const n = parseCurrencyInput(raw);
  return formatBRL(n);
}
