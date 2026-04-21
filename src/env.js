import { formatEnvError } from "./errors.js"

export const env = (schema) => {
  const config = {}
  const errors = []

  for (const key of Object.keys(schema)) {
    const rule = schema[key]
    const value = process.env[key]

    if (!rule || typeof rule.parse !== "function") {
      throw new Error(`Invalid schema for "${key}"`)
    }

    try {
      config[key] = rule.parse(value, key)
    } catch (err) {
      errors.push(err) // 👈 IMPORTANT FIX
    }
  }

  if (errors.length > 0) {
    throw new Error(formatEnvError(errors))
  }

  return config
}
