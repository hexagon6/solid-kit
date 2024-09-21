<svelte:options runes />

<script>
  import './button.css'

  let { onclick, label, primary = false, backgroundColor, size = 'medium' } = $props()

  let mode = $derived(primary ? 'storybook-button--primary' : 'storybook-button--secondary')

  let style = $derived(backgroundColor ? `background-color: ${backgroundColor}` : '')
</script>

<button
  type="button"
  class={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
  {style}
  {onclick}
>
  {label}
</button>
