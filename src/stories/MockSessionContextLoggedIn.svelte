<script>
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'

  // FIXME: mock a whole session object
  const session = writable({
    session: {
      info: { webId: 'http://localhost:3000/pod1/profile/card#me', isLoggedIn: true },
    },
    destroy: () => console.log('destroying session'),
  })

  const { children } = $props()

  setContext('session', session)
</script>

{@render children()}
