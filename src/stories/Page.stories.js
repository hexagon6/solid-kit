import { within, userEvent, expect, waitFor } from '@storybook/test'

import Page from './Page.svelte'

export default {
  title: 'Solid/Page',
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

export const LoggedOut = {
  args: {
    session: {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const webIdInput = canvas.getByLabelText('Enter your webid', { selector: 'input' })
    await expect(webIdInput).toBeInTheDocument()

    const haveNoWebIDLink = canvas.getByText("I don't have a Solid WebID Profile")
    await expect(haveNoWebIDLink).toBeInTheDocument()

    // await userEvent.click(loginButton)
  },
}

export const LoggedOutOIDCIssuerSet = {
  args: {
    oidcIssuer: 'http://localhost:3000',
    session: {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const loginButton = canvas.getByRole('button', { name: /Login/i })
    await expect(loginButton).toBeInTheDocument()

    const loginText = canvas.getByText('Login with http://localhost:3000')
    await expect(loginText).toBeInTheDocument()

    // await userEvent.click(loginButton)
  },
}

export const LoggedOutOIDCIssuerSetResetButton = {
  args: {
    oidcIssuer: 'http://localhost:3000',
    session: {},
    reset: 'Reset',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const loginButton = canvas.getByRole('button', { name: /Login/i })
    await expect(loginButton).toBeInTheDocument()

    const loginText = canvas.getByText('Login with http://localhost:3000')
    await expect(loginText).toBeInTheDocument()

    // await userEvent.click(loginButton)
    const resetButton = canvas.getByRole('button', { name: /Reset/i })
    await expect(resetButton).toBeInTheDocument()
    // await userEvent.click(resetButton)
  },
}

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const LoggedIn = {
  args: {
    session: { info: { isLoggedIn: true, webId: 'http://localhost:3000/pod1/card#me' } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // await waitFor(() => expect(loginButton).not.toBeInTheDocument())

    const loggedInText = canvas.getByText('logged in as http://localhost:3000/pod1/card#me')
    await expect(loggedInText).toBeInTheDocument()
    const logoutButton = canvas.getByRole('button', { name: /Log out/i })
    await expect(logoutButton).toBeInTheDocument()
  },
}
