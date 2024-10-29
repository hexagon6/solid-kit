import { mdsvex } from 'mdsvex'
import adapter from '@sveltejs/adapter-static'
import process from 'node:process'

const { BASEPATH } = process.env
const base = BASEPATH || ''

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    paths: { base },
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    prerender: {
      handleHttpError: ({ message }) => {
        throw new Error(message)
      },
      entries: ['/', '/redirect', '/redirect/', '/app', '/redirect/app', '/login'],
    },
  },

  preprocess: [mdsvex()],
  extensions: ['.svelte', '.svx'],
}

export default config
