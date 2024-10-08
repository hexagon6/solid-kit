<script>
  import Redirect from '$lib/components/Redirect.svelte'

  const { data } = $props()

  export const csr = true
  export const ssr = false
</script>

<Redirect redirect={data.redirect.target} from={'/redirect'} />
