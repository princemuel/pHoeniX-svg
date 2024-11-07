import { isServer } from "../utilities/guards";

export const dateline = (
  ...args: ConstructorParameters<typeof Intl.DateTimeFormat>
) => {
  const [locales, options] = args;
  const language: Intl.LocalesArgument =
    locales || (isServer ? ["en", "en-US"] : navigator.language);
  return new Intl.DateTimeFormat(language, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    ...options,
  });
};

export const moment = dateline("en-US", { weekday: "short" });
