export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  String(value).trim() === ""

export const requiredError = (key) => ({
  key,
  type: "required"
})

export const invalidError = (key, expected, received) => ({
  key,
  type: "invalid",
  expected,
  received
})

export const withDefault = (rule, defaultValue) => {
  return {
    parse(value, key) {
      if (isEmpty(value)) {
        return typeof defaultValue === "function"
          ? defaultValue()
          : defaultValue
      }

      return rule.parse(value, key)
    }
  }
}

export const withOptional = (rule) => {
  return {
    parse(value, key) {
      if (isEmpty(value)) {
        return undefined
      }

      return rule.parse(value, key)
    }
  }
}
