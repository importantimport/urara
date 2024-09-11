import antfu from '@antfu/eslint-config'
import ii from '@importantimport/eslint-config'

export default antfu({
  svelte: true,
  typescript: true,
  unocss: true,
}).append(ii({ functional: false }))
