import postcssPresetEnv from 'postcss-preset-env'
import cssnano from 'cssnano'
import tailwindcss from 'tailwindcss'
import tailwindConfig from './tailwind.config.js'

export default {
  plugins: [
    tailwindcss(tailwindConfig),
    postcssPresetEnv,
    ...(process.env.NODE_ENV === 'production'
      ? [
          cssnano({
            preset: ['default', { discardComments: { removeAll: true } }]
          })
        ]
      : [])
  ]
}
