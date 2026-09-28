export const PRICE_PATTERN = /€|\d\s*\b(?:EUR|lei|RON)\b|\b(?:EUR|lei|RON)\b\s*\d/i

export function withoutPrices<T extends { question: string; answer: string }>(faqs: T[]): T[] {
  return faqs.filter((f) => !PRICE_PATTERN.test(`${f.question} ${f.answer}`))
}
