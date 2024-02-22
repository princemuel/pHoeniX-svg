import { cn, type CnOptions } from "tailwind-variants";

export const tw = <T extends CnOptions>(...classes: T) =>
  cn(...classes)({ twMerge: true });

export function pluralize<
  C extends number,
  N extends string,
  P extends string = `${N}s`,
>(count: C, noun: N, plural?: P) {
  return (count === 1 ? noun : plural ?? `${noun}s`) as C extends 1 ? N : P;
}

export const unique = <T>(array: T[]) => {
  return [...new Set(array)];
};

export function nFormatter(num: number, digits?: number | undefined) {
  if (!num) return "0";

  const LOOKUP = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const TRAILING_ZERO_REGEX = /\.0+$|(\.[0-9]*[1-9])0+$/;

  const { value, symbol } = LOOKUP.slice()
    .reverse()
    .find((item) => num >= item.value) || { value: 1, symbol: "" };

  const validDigits = digits ? Math.abs(digits) : 1;

  return (
    (num / value).toFixed(validDigits).replace(TRAILING_ZERO_REGEX, "$1") +
    symbol
  );
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || typeof str !== "string" || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};
