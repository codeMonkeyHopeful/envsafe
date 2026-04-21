import { env } from "../src/env.js"
import { number, string } from "../src/schema.js"

describe("envsafe - env()", () => {
  beforeEach(() => {
    process.env.PORT = "3000"
    process.env.DATABASE_URL = "postgres://test"
  })

  afterEach(() => {
    delete process.env.PORT
    delete process.env.DATABASE_URL
  })

  test("parses valid env variables correctly", () => {
    const config = env({
      PORT: number(),
      DATABASE_URL: string()
    })

    expect(config.PORT).toBe(3000)
    expect(config.DATABASE_URL).toBe("postgres://test")
  })

  test("throws error for invalid number", () => {
    process.env.PORT = "abc"

    expect(() =>
      env({
        PORT: number()
      })
    ).toThrow()
  })

  test("throws error for missing required string", () => {
    delete process.env.DATABASE_URL

    expect(() =>
      env({
        DATABASE_URL: string()
      })
    ).toThrow()
  })
})


describe("envsafe - default()", () => {
  afterEach(() => {
    delete process.env.PORT
  })

  test("applies default value when env var is missing", () => {
    const config = env({
      PORT: number().default(4000)
    })

    expect(config.PORT).toBe(4000)
  })

  test("uses env value when provided (not default)", () => {
    process.env.PORT = "3000"

    const config = env({
      PORT: number().default(4000)
    })

    expect(config.PORT).toBe(3000)
  })
})


describe("envsafe - optional()", () => {
  afterEach(() => {
    delete process.env.PORT
  })

  test("returns undefined when optional env var is missing", () => {
    const config = env({
      PORT: number().optional()
    })

    expect(config.PORT).toBeUndefined()
  })

  test("parses value when optional env var is provided", () => {
    process.env.PORT = "3000"

    const config = env({
      PORT: number().optional()
    })

    expect(config.PORT).toBe(3000)
  })
})
