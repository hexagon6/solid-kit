<script>
  import { base } from '$app/paths'
  import SolidLogin from '$lib/components/SolidLogin.svelte'
</script>

<button
  onclick={() => {
    history.back()
  }}>go back</button
>
<SolidLogin {base} />
