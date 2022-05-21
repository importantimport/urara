import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import tailwindcss from 'tailwindcss'
import tailwindConfig from './tailwind.config.js'

export default {
  plugins: [
    tailwindcss(tailwindConfig),
    autoprefixer,
    ...(process.env.NODE_ENV === 'production'
      ? [
          cssnano({
            preset: ['default', { discardComments: { removeAll: true } }]
          })
        ]
      : [])
  ]
}
