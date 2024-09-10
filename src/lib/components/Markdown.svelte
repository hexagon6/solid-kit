<script>
  import * as marked from 'marked'
  import { default as purify } from 'dompurify'

  let { parse } = $props()
</script>

{@html purify.sanitize(marked.parse(parse))}
