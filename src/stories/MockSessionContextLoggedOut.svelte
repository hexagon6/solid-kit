<script>
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { createSession } from '$lib/solid/session.svelte.js'

  const session = writable(createSession())

  const { children } = $props()

  setContext('session', session)
</script>

{@render children()}
