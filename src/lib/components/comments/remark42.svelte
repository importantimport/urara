<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import type { Remark42Config } from '$lib/types/post'
  export let post: Urara.Post
  export let config: Remark42Config

  let remark42Instance: any

  onMount(() => {
    const [c, s] = [document.createElement('script'), document.createElement('script')]

    c.id = 'remark42_config'
    c.type = 'application/javascript'
    c.innerHTML = `
      var remark_config = {
        host: '${config.host}',
        site_id: '${config.site_id || 'remark'}',
        url: '${post.path}',
        components: [${config.components || "'embed'"}],
        max_shown_comments: ${config.max_shown_comments || 15},
        max_last_comments: ${config.max_last_comments || 15},
        theme: '${config.theme || 'light'}',
        page_title: '${config.page_title || post.title}',
        locale: '${config.locale || 'en'}',
        show_email_subscription: ${config.show_email_subscription || true},
        show_rss_subscription: ${config.show_rss_subscription || true},
        simple_view: ${config.simple_view || false},
        no_footer: ${config.no_footer || false},
      }`

    s.id = 'remark42_script'
    s.type = 'application/javascript'
    s.innerHTML = `!function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src='${config.host}/web/'+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);`
    document.head.appendChild(c)
    document.head.appendChild(s)

    const opt = {
      ...config,
      url: post.path
    }

    const checkRemark42 = () => {
      if ((window as any).REMARK42) {
        remark42Instance = (window as any).REMARK42.createInstance({
          node: document.getElementById('remark42') as HTMLElement,
          ...opt
        })
      } else {
        setTimeout(checkRemark42, 100)
      }
    }

    checkRemark42()
  })

  onDestroy(() => {
    if (remark42Instance && typeof remark42Instance.destroy === 'function') {
      remark42Instance.destroy()
    }
  })
</script>

<div id="remark42" />
