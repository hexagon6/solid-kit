<svelte:options runes />

<script>
  import { writable } from 'svelte/store'
  import { setContext } from 'svelte'
  import Header from '$lib/components/SolidHeader.svelte'

  let { context = 'session', session, oidcIssuer, reset } = $props()
  let store = writable(session)
  setContext(context, store)
</script>

<Header {oidcIssuer} {reset} />
