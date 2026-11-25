/**
 * Shape of a component's `<Name>.spec.ts`: the single source of its usage
 * and decision rules (parts 1–3 of the usage doc). `<Name>.md` holds the
 * rest (props, tokens, example) and does not repeat these rules.
 * Text is Thai; inline code uses backticks and renders as code in Storybook.
 */
export type ComponentSpec = {
  /** Component name, as in the folder. */
  name: string
  /** One line: what it is for. */
  purpose: string
  /** Situations where it fits, and which variant/size to pick. */
  whenToUse: { situation: string; use: string }[]
  /** Cases where something else fits better, and what to use instead. */
  whenNotToUse: { case: string; instead: string }[]
  /** Deliberate choices, with the reason, so nobody undoes them by accident. */
  decisions: { rule: string; why: string }[]
  /** Open questions for the team. Empty when everything is decided. */
  todos: string[]
}
