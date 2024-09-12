<script>
  import Redirect from '$lib/components/Redirect.svelte'

  const { data } = $props()
</script>

<Redirect redirect={data.target} from={'/redirect'} />
