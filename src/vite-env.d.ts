// This declaration file provides type definitions for environment variables
// that are accessible via `process.env`. It's configured to augment the
// existing `NodeJS.ProcessEnv` interface, which is a common pattern in
// projects that might include Node.js type definitions (`@types/node`).
// This prevents redeclaration errors while ensuring type safety for
// environment variables injected by Vite.

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The API key for the Google Gemini API.
     * This is injected at build time by Vite's `define` config.
     * It MUST be set in the deployment environment.
     */
    readonly API_KEY: string;
  }
}
