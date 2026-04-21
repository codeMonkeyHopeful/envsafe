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

// -------------------- BOOLEAN --------------------

export const boolean = () => {
  const rule = {
    parse(value, key) {
      if (isEmpty(value)) {
        throw requiredError(key)
      }

      const normalized = String(value).trim().toLowerCase()

      const valid =
        normalized === "true" ||
        normalized === "false" ||
        normalized === "1" ||
        normalized === "0" ||
        normalized === "yes" ||
        normalized === "no"

      if (!valid) {
        throw invalidError(key, "boolean", value)
      }

      return (
        normalized === "true" ||
        normalized === "1" ||
        normalized === "yes"
      )
    }
  }

  rule.default = (def) => withDefault(rule, def)
  rule.optional = () => withOptional(rule)

  return rule
}


// -------------------- ENUM --------------------
export const enum_ = (allowedValues) => {
  const rule = {
    parse(value, key) {
      if (isEmpty(value)) {
        throw requiredError(key)
      }

      const str = String(value).trim()

      if (!allowedValues.includes(str)) {
        throw invalidError(
          key,
          `one of: ${allowedValues.join(", ")}`,
          value
        )
      }

      return str
    }
  }

  rule.default = (def) => {
    if (!allowedValues.includes(def)) {
      throw new Error(
        `Invalid default for "${def}". Must be one of: ${allowedValues.join(", ")}`
      )
    }

    return withDefault(rule, def)
  }

  rule.optional = () => withOptional(rule)

  return rule
}
