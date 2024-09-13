// import { within, userEvent, expect, waitFor } from '@storybook/test'

import SolidLogin from '$lib/components/SolidLogin.svelte'
import SessionContextLoggedOut from './MockSessionContextLoggedOut.svelte'

export default {
  title: 'Solid/Login/LoggedOut',
  component: SolidLogin,
  decorators: [() => SessionContextLoggedOut],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const LoggedOut = {
  args: {},
}

export const LoggedOutWithOIDC = {
  args: {
    oidcIssuer: 'http://localhost:3000',
  },
}
