const postcssImport = require('postcss-import')
const postcssPresetEnv = require('postcss-preset-env')
const tailwindcss = require('tailwindcss')
const cssnano = require('cssnano')

module.exports = {
  plugins: [
    postcssImport,
    tailwindcss,
    postcssPresetEnv,
    ...(process.env.NODE_ENV === 'production'
      ? [cssnano({
        preset: [
          'default',
          { discardComments: { removeAll: true } }
        ]
      })]
      : []
    )
  ]
}
