<svelte:options runes />

<script>
  import SolidLogin from '$lib/components/SolidLogin.svelte'

  let {
    base,
    context = 'session',
    handleSet,
    oidcIssuer,
    reset,
    successInfo: successSnippet,
    disableInfo = false,
    logoText = 'Solid WebID',
  } = $props()
</script>

{#snippet successInfo(info)}
  <div class="info">
    logged in <span class="info-webid">with {info.webId}</span>
  </div>
{/snippet}

{#snippet logo()}
  <h1>🌐🪪 <span class="logo-text">{logoText}</span></h1>
{/snippet}

<header>
  <div class="solid-header">
    <div class="logo-box">
      {@render logo()}
    </div>
    <div class="flex-row login-box">
      <SolidLogin
        {base}
        {context}
        {oidcIssuer}
        {reset}
        {handleSet}
        success={disableInfo ? undefined : successSnippet || successInfo}
      />
    </div>
  </div>
</header>

<style>
  header {
    container-type: inline-size;
  }

  @container (width < 400px) {
    .login-box {
      background-color: rgba(20, 20, 255, 0.2);
    }
    .info-webid {
      display: none;
    }
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    gap: 1em;
  }

  .solid-header {
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5em;
  }

  .solid-header :global(h1) {
    font-weight: 700;
    font-size: 20px;
    line-height: 1;
    margin: 6px 0 6px 10px;
    display: inline-block;
    vertical-align: top;
  }

  .solid-header :global(svg) {
    display: inline-block;
    vertical-align: top;
  }

  .solid-header :global(button + button) {
    margin-left: 10px;
  }

  .solid-header :global(.welcome) {
    color: #333;
    font-size: 14px;
    margin-right: 10px;
  }
</style>
