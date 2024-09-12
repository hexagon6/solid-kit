<script>
  import { container } from '../solid/storage'

  let { /** @type {string} */ webId, /** @type {function} */ storageIs } = $props()

  let storage = $state('')

  $effect(async () => {
    if (webId) {
      storage = await container(webId)
      if (typeof storageIs === 'function') {
        storageIs(storage)
      }
    }
  })
</script>

{storage}
