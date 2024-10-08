<script>
  import { getContext, onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { getDefaultSession, handleIncomingRedirect } from '@inrupt/solid-client-authn-browser'

  const session = getContext('session')

  const { from, redirect = '/' } = $props()
  // @ts-ignore
  const redirectUrl = redirect.replace(from, '')
  const target = new URL(
    redirectUrl !== '/' ? `/${redirectUrl}` : '/',
    window?.location?.href,
  ).toString()

  const completeLogin = async () => handleIncomingRedirect({ restorePreviousSession: true })

  onMount(() => {
    completeLogin().then((solidAuthInfo) => {
      console.log('completing login', solidAuthInfo)
      $session.init(getDefaultSession())
      console.log('redirecting to', target, 'from', redirectUrl)
      goto(target)
    })
  })
</script>

redirecting to [{target}]
