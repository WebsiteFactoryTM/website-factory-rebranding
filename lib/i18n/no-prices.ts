export const PRICE_PATTERN = /€|\bEUR\b|\blei\b|\bRON\b/i

export function withoutPrices<T extends { question: string; answer: string }>(faqs: T[]): T[] {
  return faqs.filter((f) => !PRICE_PATTERN.test(`${f.question} ${f.answer}`))
}
