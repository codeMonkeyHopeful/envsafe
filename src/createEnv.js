export function createEnv(schema) {
  const config = {}

  for (const key in schema) {
    const rule = schema[key]
    const value = process.env[key]

    config[key] = rule.parse(value, key)
  }

  return config
}
