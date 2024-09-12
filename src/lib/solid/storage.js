import { either, pipe as _, split, prop, when, identity, endsWith, replace, tryCatch } from 'ramda'
import resolvePathname from 'resolve-pathname'
import { option } from 'fp-ts'

const { some, none } = option
const noTrailingSlash = _(when(endsWith('/'), replace(/\/$/, '')))
export const getParentContainer = (/** @type {string} */ url) =>
  tryCatch(
    () => new URL(resolvePathname('./', noTrailingSlash(url))).href,
    () => none,
  )()

export const hasSpaceStorageType = (/** @type {string[]} */ linkHeaders) => {
  const space = linkHeaders
    ?.map((l) => l.split(';'))
    .filter(
      ([k, v]) =>
        v?.trim() === 'rel="type"' &&
        k?.trim().toLowerCase() === '<http://www.w3.org/ns/pim/space#Storage>'.toLowerCase(),
    )

  return space?.length > 0 || false
}

const fetchHead = async (url) => fetch(url, { method: 'HEAD', cache: 'no-store' })

const links = _(prop('headers'), (o) => o?.get('link') || '') // w.headers.get('link')

export const fetchLinkHeaders = async (/** @type {string} */ url) => {
  if (typeof url !== 'string') {
    return none
  }
  const res = fetchHead(url).catch((e) => none)
  if (typeof res.then !== 'function') {
    return none
  }
  // @ts-ignore
  return res.then(either(_(links, either(split(','), identity), some), none))
}

/** @returns {Promise<some | none>} */
export const container = async (/** @type {string} */ url) => {
  const parent = getParentContainer(url)
  if (!parent || parent === url) {
    return none
  }
  return fetchLinkHeaders(parent).then(async (h) => {
    if (!h) {
      console.error('result is Nothing', parent)
      return none
    }
    // console.debug(parent, h.value, hasSpaceStorageType(h.value))
    return hasSpaceStorageType(h.value) ? parent : await container(parent)
  })
}
