import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: string | number) {
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  return numValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function parseNumber(value: string): number {
  // Remove commas and non-numeric characters except decimal point and minus
  const cleaned = value.replace(/,/g, "").replace(/[^\d.-]/g, "");
  return parseFloat(cleaned) || 0;
}

export function parsePercentage(value: string): number {
  // Remove % symbol, commas, and parse
  const cleaned = value.replace(/[,%]/g, "").trim();
  return parseFloat(cleaned) || 0;
}
