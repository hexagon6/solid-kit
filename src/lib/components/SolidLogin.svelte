<script>
  import { onMount } from 'svelte'
  import { getContext } from 'svelte'
  import WebIDCheck from '@hexagon6/svelte-solid-webid-check/webid-check.svelte'
  import { startLogin, startLogout } from '$lib/solid/auth.svelte.js'
  import { isEmpty } from 'ramda'

  let loginEndpoint = $state('')

  let session = getContext('session')

  let info = $derived($session.session.info)

  const setUrl = ({ oidcEndpoint }) => (loginEndpoint = oidcEndpoint)

  /**
   * @type {string}
   */
  let redirect

  onMount(() => {
    redirect = new URLSearchParams(window.location.search).get('redirect_url') || '/'
  })
</script>

{#if isEmpty($session.session)}
  {#if !loginEndpoint}
    <WebIDCheck validOIDCEndpoint={setUrl} />
  {:else}
    <button onclick={() => startLogin($session, loginEndpoint, redirect)}
      >Login to {loginEndpoint}</button
    >
  {/if}
{:else}
  <p>Your webid is {info?.webId}</p>
  <button onclick={() => startLogout($session)}>Log out</button>
  <!-- <pre>{JSON.stringify($session, null, 2)}</pre> -->
{/if}
