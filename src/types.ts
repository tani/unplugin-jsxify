export interface Options {
  default?: {
    extensions?: string[]
    jsxImportSource?: string
    render?: (source: string) => string
    extract?: (source: string) => Record<string, unknown>
  }
  [language: string]: {
    extensions?: string[]
    jsxImportSource?: string
    render?: (source: string) => string
    extract?: (source: string) => Record<string, unknown>
  } | undefined
}
