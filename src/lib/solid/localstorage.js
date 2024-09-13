import { writable } from 'svelte/store'

const oidcIssuerLocal = localStorage.oidcIssuer

export const oidcIssuer = writable(oidcIssuerLocal || '')

oidcIssuer.subscribe((value) => (localStorage.oidcIssuer = value))
