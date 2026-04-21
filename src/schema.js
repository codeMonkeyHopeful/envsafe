import {
  invalidError,
  isEmpty,
  requiredError,
  withDefault,
  withOptional
} from "./utils.js"

// -------------------- STRING --------------------

export const string = () => {
  const rule = {
    parse(value, key) {
      if (isEmpty(value)) {
        throw requiredError(key)
      }

      return value
    }
  }

  rule.default = (def) => withDefault(rule, def)
  rule.optional = () => withOptional(rule)

  return rule
}

// -------------------- NUMBER --------------------

export const number = () => {
  const rule = {
    parse(value, key) {
      if (isEmpty(value)) {
        throw requiredError(key)
      }

      const n = Number(String(value).trim())

      if (Number.isNaN(n)) {
        throw invalidError(key, "number", value)
      }

      return n
    }
  }

  rule.default = (def) => withDefault(rule, def)
  rule.optional = () => withOptional(rule)

  return rule
}
