import { fn } from '@storybook/test'
import Header from './Header.svelte'

export default {
  title: 'Example/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

export const LoggedIn = {
  args: {
    login: fn(),
    logout: fn(),
    createAccount: fn(),
    user: {
      name: 'Jane Doe',
    },
  },
}

export const LoggedOut = {
  args: {
    login: fn(),
    logout: fn(),
    createAccount: fn(),
  },
}
