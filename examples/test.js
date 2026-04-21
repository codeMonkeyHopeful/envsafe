import { env, number, string } from "../src/index.js"

const config = env({
  PORT: number().default(3000),
  NAME: string().default("dev")
})

console.log(config)
