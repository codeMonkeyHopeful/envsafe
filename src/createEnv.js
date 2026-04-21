export const createEnv = (schema) => {
  const config = {}

  for (const key of Object.keys(schema)) {
    const rule = schema[key]

    if (!rule || typeof rule.parse !== "function") {
      throw new Error(`${key} is not a valid schema rule`)
    }

    const value = process.env[key]
    config[key] = rule.parse(value, key)
  }

  return config
}
