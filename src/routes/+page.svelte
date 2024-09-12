<script>
  import { getContext } from 'svelte'
  import SolidStorage from '$lib/components/SolidStorage.svelte'

  let s = getContext('session')

  const { session } = $s

  const { info } = session
  console.log('session info:', info)

  let webId = $derived.by(() => {
    return info?.isLoggedIn ? info.webId : null
  })
  let loggedIn = $derived(!!info?.isLoggedIn)
</script>

<h1>Welcome to solid-kit</h1>
<nav>
  <a href="/login?redirect_url=/">Login Page</a>
</nav>
<main>
  {#if loggedIn}
    <h2>You are logged in</h2>
    <div>
      <label for="webid">your webid:</label>&nbsp;<span id="webid">{webId}</span>
    </div>
    <div>
      <label for="storage">storage location:</label>&nbsp;<span id="storage"
        ><SolidStorage {webId} /></span
      >
    </div>
  {:else}
    please log in
  {/if}
</main>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<style>
  main {
    margin: 2em;
    display: flex;
    flex-direction: column;
    font-family: 'Courier New', Courier, monospace;
  }
</style>
