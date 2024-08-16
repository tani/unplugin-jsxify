export interface Options {
  default?: {
    extensions?: string[]
    jsxImportSource?: string
    render?: (source: string) => string
  }
  [language: string]: {
    extensions?: string[]
    jsxImportSource?: string
    render?: (source: string) => string
  } | undefined
}
