# envsafe

Safe environment variable parsing and validation for Node.js.

envsafe helps you define a schema for environment variables and ensures they are validated at startup, preventing runtime crashes caused by missing or invalid configuration.

---

## Installation

```bash
npm install envsafe
```

---

## Usage

```js
import { env, string, number, boolean } from "envsafe"

export const config = env({
  DATABASE_URL: string(),
  PORT: number().default(3000),
  DEBUG: boolean().default(false)
})
```

Use your config:

```js
console.log(config.DATABASE_URL)
console.log(config.PORT)
```

---

## How it works

envsafe reads values from process.env, validates them against your schema, and returns a configuration object.

If a variable is missing or invalid, the app fails immediately with a clear error message.

---

## Example error

```txt
❌ Environment validation failed:

- DATABASE_URL is required but not set
- PORT must be a number, got "abc"
```

---

## Goals

- No framework lock-in
- No runtime overhead beyond validation
- Minimal external dependencies
- Easy to use in any Node.js project

---

## Roadmap

- Better error formatting
- .env file loading support

---

## License

MIT
