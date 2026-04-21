export function string() {
  return {
    parse(value, key) {
      if (!value) throw new Error(`${key} is required`)
      return value
    }
  }
}

export function number() {
  return {
    parse(value, key) {
      const n = Number(value)
      if (!value || Number.isNaN(n)) {
        throw new Error(`${key} must be a number`)
      }
      return n
    }
  }
}
