<svelte:options runes />

<script>
  import SolidLogin from '$lib/components/SolidLogin.svelte'

  let { context = 'session', oidcIssuer, reset } = $props()
</script>

{#snippet success(info)}
  <div class="info">
    logged in with {info.webId}
  </div>
{/snippet}

{#snippet logo()}
  <h1>🌐🪪 Solid WebID</h1>
{/snippet}

<header>
  <div class="solid-header">
    <div>
      {@render logo()}
    </div>
    <div class="flex-row">
      <SolidLogin {context} {oidcIssuer} {reset} {success} />
    </div>
  </div>
</header>

<style>
  .flex-row {
    display: flex;
    flex-direction: row;
  }

  .solid-header {
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
