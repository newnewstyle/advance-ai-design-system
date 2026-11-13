/** Two-letter avatar fallback, e.g. "สมศรี ใจดี" → "สใ". */
export function initials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`
}
