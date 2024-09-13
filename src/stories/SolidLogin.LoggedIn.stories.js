// import { within, userEvent, expect, waitFor } from '@storybook/test'

import SolidLogin from '$lib/components/SolidLogin.svelte'
import SessionContextLoggedIn from './MockSessionContextLoggedIn.svelte'
import { createRawSnippet } from 'svelte'
import { oidcIssuer } from '$lib/solid/localstorage.js'

const loginSuccess = createRawSnippet((name) => ({
  render: () => `
			<h1>You are Logged In <pre>${JSON.stringify(name(), null, 2)}</pre></h1>
		`,
}))

export default {
  title: 'Solid/Login/LoggedIn',
  component: SolidLogin,
  decorators: [() => SessionContextLoggedIn],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

export const LoggedIn = {
  args: {
    oidcIssuer: 'http://localhost:3000',
  },
}

export const LoggedInWithoutOIDCParam = {
  args: {},
}

export const LoggedInWithSnippet = {
  args: {
    oidcIssuer: 'http://localhost:3000',
    success: loginSuccess,
  },
}

export const LoggedInWithReset = {
  args: {
    oidcIssuer,
    reset: 'reset',
    handleSet: (url) => {
      oidcIssuer.set(url)
    },
    handleReset: () => {
      oidcIssuer.set('')
    },
  },
}
