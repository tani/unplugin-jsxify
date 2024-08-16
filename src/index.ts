import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => {
  const defaultOptions = {
    jsxImportSource: 'react',
    extensions: [] as string[],
    render: (src: string) => src,
    extract: (_src: string) => ({}) as Record<string, unknown>,
    ...options?.default ?? {},
  }
  return Object.entries(options ?? {})
    .filter(([key]) => key !== 'default')
    .map(([key, options]) => ([key, { ...defaultOptions, ...options }] as const))
    .map(([key, options]) => ({
      name: `unplugin-jsx/${key}`,
      transformInclude(id) {
        return options.extensions.some(ext => id.endsWith(`${ext}`))
      },
      transform(code) {
        return [
          `import parse from 'html-react-parser';`,
          `import library from ${JSON.stringify(options.jsxImportSource)};`,
          `export default parse(${JSON.stringify(options.render(code))}, {library});`,
          ...Object.entries(options.extract(code))
            .map(([key, value]) => `export const ${key} = ${JSON.stringify(value)};`),
        ].join('\n')
      },
    }))
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
