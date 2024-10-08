<script>
  import SolidHeader from '$lib/components/SolidHeader.svelte'

  let { children } = $props()

  const location = new URL(window.location)
  const oidcIssuer = location.searchParams.get('oidcIssuer')

  const redirect = (msg) => {
    console.log('hey!')
    console.log(window.location)
    window.location = new URL(`/app?redirect_url=/app&oidcIssuer=${msg}`, window.location.origin)
  }
</script>

<SolidHeader handleSet={redirect} {oidcIssuer} />
{@render children()}
