import { login, getDefaultSession } from '@inrupt/solid-client-authn-browser'

export async function startLogin(session, loginEndpoint, redirect, base = '') {
  if (!getDefaultSession().info.isLoggedIn) {
    if (!redirect) {
      alert('redirect is falsy')
      alert(redirect)
      return
    }
    await login({
      oidcIssuer: loginEndpoint,
      redirectUrl: new URL(`${base}/redirect${redirect}`, window.location.href).toString(),
      clientName: 'Solid testing',
    })
  } else {
    session.init()
  }
}

export const startLogout = (session) => {
  console.log('logging out')
  session.destroy()
}
