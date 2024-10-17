# @hexagon6/solid-kit

solid-kit -> [Social Linked Data](https://solidproject.org) with [SvelteKit](https://kit.svelte.dev/)

## Goals

- Test-bed for [svelte](https://svelte.dev/) components usable in sveltekit applications.
- An SDK for getting started with Solid and Single Page Applications.
- Deployable on static webservers with ["@sveltejs/adapter-static"](https://github.com/sveltejs/kit/tree/main/packages/adapter-static#sveltejsadapter-static)
- No backend required, only a [POD](https://solidproject.org/for-developers#hosted-pod-services)

## Non-Goals

- Server side rendering.

## Implementation

This software is available on npm.org as [@hexagon6/solid-kit](https://www.npmjs.com/package/@hexagon6/solid-kit).

### Installation

Using your favorite package manager, run: `npm install @hexagon6/solid-kit`.

It is supposed to be used within a [sveltekit](https://kit.svelte.dev/docs/creating-a-project) project.

### Usage

see [src/lib/index.js](src/lib/index.js) for importable components and helper functions:

```javascript
import {
  LDContent,
  Markdown,
  Redirect,
  SolidLogin,
  SolidStorage,
  createSession,
  fetchLinkHeaders,
  container,
  getParentContainer,
  oidcIssuer,
} from '@hexagon6/solid-kit'
```

#### SvelteKit routes

Run this repo locally with `pnpm run dev` and inspect what you find in [src/routes/](src/routes).

`login/` and `redirect/` pages are recommended as endpoints in your sveltekit project, so openid connect works within a single-page-application setup.

### Components

There are some Svelte components that can be used with payloads returned from a Solid POD.

- [LDContent](src/lib/components/LDContent.svelte): Linked Data (application/json+ld), supports TypeIndex & Preferences file
- [Markdown](src/lib/components/Markdown.svelte): Render Markdown

Some Svelte components can be used for interacting with a Solid OIDC server, which handles login, authorization, redirect & logout

- [Redirect](src/lib/components/Redirect.svelte): Redirect from registered URL to the page the user would like to land on authenticated.
- [SolidLogin](src/lib/components/SolidLogin.svelte): A login component, which allows setting a validated webid / oidc provider and subsequently shows log in and out buttons
- [SolidStorage](src/lib/component/SolidStorage.svelte): A component, capable of resolving a Storage URL with the LDP-Container http link headers

### helper functions

- [createSession](src/lib/solid/sessions.svelte.js): A reactive store for solid session handling
- [fetchLinkHeaders](src/lib/solid/ldp-storage.js): Fetch HTTP Link headers and parse them
- [container](src/lib/solid/ldp-storage.js): Derive a container from LDP headers
- [getParentContainer](src/lib/solid/ldp-storage.js): Derive a parent container from a URL
- [oidcIssuer](src/lib/solid/localstorage.js): Store the current selected oidcIssuer in LocalStorage

### Integration Testing

Run `pnpm run ci` to check if the full stack is still working after changes.

### Storybook

> Status: Implemented, but not yet published

`pnpm run storybook` to try it locally
