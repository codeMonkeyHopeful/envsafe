import { withDefault } from "./utils.js"

export const string = () => {
  const rule = {
    parse(value, key) {
      if (!value) throw new Error(`${key} is required`)
      return value
    }
  }

  rule.default = (def) => withDefault(rule, def)

  return rule
}

export const number = () => {
  const rule = {
    parse(value, key) {
      const n = Number(value)
      if (!value || Number.isNaN(n)) {
        throw new Error(`${key} must be a number`)
      }
      return n
    }
  }

  rule.default = (def) => withDefault(rule, def)

  return rule
}
