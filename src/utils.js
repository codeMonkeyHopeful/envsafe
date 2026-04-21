export function withDefault(rule, defaultValue) {
  return {
    parse(value, key) {
      if (value === undefined || value === "") {
        return defaultValue
      }
      return rule.parse(value, key)
    }
  }
}
