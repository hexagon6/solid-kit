<script>
  import { base } from '$app/paths'
  import SolidHeader from '$lib/components/SolidHeader.svelte'

  let { children } = $props()

  const location = new URL(window.location)
  const oidcIssuer = location.searchParams.get('oidcIssuer')

  const redirect = (msg) => {
    console.log('hey!')
    console.log(window.location)
    window.location = new URL(
      `${base}/app?redirect_url=${base}/app&oidcIssuer=${msg}`,
      window.location.origin,
    )
  }
</script>

<SolidHeader {base} handleSet={redirect} {oidcIssuer} />
{@render children()}
