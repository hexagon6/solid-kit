<script>
  import { onMount } from 'svelte'
  import { getContext } from 'svelte'
  import WebIDCheck from '@hexagon6/svelte-solid-webid-check/webid-check.svelte'
  import { startLogin, startLogout } from '$lib/solid/auth.svelte.js'
  import { isEmpty } from 'ramda'

  let { context = 'session', oidcIssuer = '', success, reset, handleReset, handleSet } = $props()

  let loginEndpoint = $state(oidcIssuer)

  let session = getContext(context)

  let info = $derived($session.session.info)

  const setUrl = ({ oidcEndpoint }) => {
    if (typeof handleSet === 'function') {
      handleSet(oidcEndpoint)
    }
    loginEndpoint = oidcEndpoint
  }

  const resetUrl = () => {
    if (typeof handleReset === 'function') {
      handleReset()
    }
    loginEndpoint = undefined
  }

  /**
   * @type {string}
   */
  let redirect

  onMount(() => {
    redirect = new URLSearchParams(window.location.search).get('redirect_url') || '/'
  })
</script>

{#snippet resetButton()}
  {#if reset}
    <button onclick={resetUrl}>{reset}</button>
  {/if}
{/snippet}

{#snippet label()}
  Enter your webid
{/snippet}

{#if isEmpty($session?.session)}
  {#if !loginEndpoint}
    <WebIDCheck {label} placeholder="your WebID url" validOIDCEndpoint={setUrl} />
    <a href="https://solidproject.org/users/get-a-pod#next-steps" target="_blank"
      >I don't have a Solid WebID Profile</a
    >
  {:else}
    <button onclick={() => startLogin($session, loginEndpoint, redirect)}
      >Login to {loginEndpoint}</button
    >
    {@render resetButton()}
  {/if}
{:else if $session}
  {#if success && typeof success === 'function'}
    {@render success(info)}
  {/if}
  <button onclick={() => startLogout($session)}>Log out</button>
  {@render resetButton()}
{:else}
  no session available, use setContext('session')
{/if}
