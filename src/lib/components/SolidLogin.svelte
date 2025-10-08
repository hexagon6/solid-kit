<script lang="ts">
  import { onMount } from 'svelte'
  import { getContext } from 'svelte'
  import WebIDCheck from '@hexagon6/svelte-solid-webid-check/webid-check.svelte'
  import { startLogin, startLogout } from '$lib/solid/auth.svelte.js'
  import { isEmpty } from 'ramda'

  let {
    base = '',
    context = 'session',
    oidcIssuer = '',
    success,
    reset,
    handleReset,
    handleSet,
  }: {
    base?: string
    context?: string
    oidcIssuer?: string
    success?: Function
    reset?: string
    handleReset?: Function
    handleSet?: Function
  } = $props()

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

<div class="login-container">
  {#if isEmpty($session?.session)}
    {#if !loginEndpoint}
      <WebIDCheck {label} placeholder="your WebID url" validOIDCEndpoint={setUrl} />
      <a href="https://solidproject.org/users/get-a-pod#next-steps" target="_blank" class="hint"
        >I don't have a Solid WebID Profile</a
      >
    {:else}
      <button onclick={() => startLogin($session, loginEndpoint, redirect, base)}
        >Login with {loginEndpoint}</button
      >
      {@render resetButton()}
    {/if}
  {:else if $session}
    {#if success && typeof success === 'function'}
      <div class="info">
        {@render success(info)}
      </div>
    {/if}
    <div>
      <button onclick={() => startLogout($session)}>Log out</button>
      {@render resetButton()}
    </div>
  {:else}
    <div class="error">
      Setup Error:
      <div>
        no session available (your users should not see this!)
        <div>
          use
          <code>setContext('session', writable(&lbrace;session&rbrace;)</code> in your app or use
          the
          <code>session</code>
          prop)
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 0.4em;
  }

  @container (width > 400px) {
    .login-container {
      flex-direction: row;
      align-items: center;
    }
  }

  .login-container a {
    font-size: 0.8em;
  }

  .error {
    background: red;
    color: white;
    padding: 0.4em;
    border-radius: 0.3em;
  }

  .info {
    padding: 0 0.4em;
  }

  :global(button) {
    width: fit-content;
  }
</style>
