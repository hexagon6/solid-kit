import { fn } from 'storybook/test'
import Header from './Header.svelte'

export default {
  title: 'Solid/SolidHeader',
  component: Header,
  tags: ['autodocs'],
  args: {
    login: fn(),
    logout: fn(),
    createAccount: fn(),
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const NoSessionAvailable = {}

export const LoggedIn = {
  args: {
    disableInfo: false,
    session: { session: { info: { isLoggedIn: true, webId: 'http://example.com/test' } } },
    oidcIssuer: 'http://example.com',
  },
}

export const LoggedInDisableInfo = {
  args: {
    disableInfo: true,
    session: { session: { info: { isLoggedIn: true, webId: 'http://example.com/test' } } },
    oidcIssuer: 'http://example.com',
  },
}

export const LoggedInReset = {
  args: {
    session: { session: { info: { isLoggedIn: true, webId: 'http://example.com/test' } } },
    oidcIssuer: 'http://example.com',
    reset: 'reset',
  },
}

export const LoggedOut = {
  args: {
    session: { session: {} },
    oidcIssuer: 'http://example.com',
  },
}

export const LoggedOutReset = {
  args: {
    session: { session: {} },
    oidcIssuer: 'http://example.com',
    reset: 'reset',
  },
}
