import { getDefaultSession, logout } from '@inrupt/solid-client-authn-browser'

export function createSession() {
  let s = $state({})

  function init() {
    s = getDefaultSession()
  }

  function destroy() {
    logout()
    s = {}
  }

  return {
    get session() {
      return s
    },
    init,
    destroy,
  }
}
