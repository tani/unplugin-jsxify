import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin({
      html: {
        extensions: ['.html', '.htm'],
        jsxImportSource: 'react',
        render: (src: string) => src,
        extract: (_src: string) => ({ date: new Date() }),
      },
    }),
  ],
})
