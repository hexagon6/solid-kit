import { describe, it, expect, vi } from 'vitest'
import { fetchLinkHeaders, getParentContainer, hasSpaceStorageType } from './storage.js'
import { none } from 'fp-ts/Option'

global.fetch = vi.fn()

function createFetchResponse(data) {
  return {
    headers: {
      get: () => data,
    },
  }
}

describe('storage discovery', () => {
  it('can traverse up', () => {
    expect(getParentContainer('http://example.com/a/b')).toBe('http://example.com/a/')
    expect(getParentContainer('http://example.com/a')).toBe('http://example.com/')
  })
  it('traverses until root', () => {
    expect(getParentContainer('http://example.com/')).toBe(none)
  })
  it('finds pim:storage type in link header', () => {
    expect(hasSpaceStorageType(['<http://www.w3.org/ns/pim/space#storage>; rel="type"'])).toBe(true)
    expect(hasSpaceStorageType(['<http://www.w3.org/ns/pim/space#Storage>; rel="type"'])).toBe(true)
  })
  it('ignores other types in link header', () => {
    expect(hasSpaceStorageType(['a; rel="type"'])).toBe(false)
  })
  it('fetches link headers', async () => {
    fetch.mockResolvedValue(
      createFetchResponse(
        '<http://www.w3.org/ns/pim/space#Storage>; rel="type",<none>; rel="type"',
      ),
    )

    const res = await fetchLinkHeaders('http://localhost:3000/pod1/')
    expect(res?.value).toContain('<http://www.w3.org/ns/pim/space#Storage>; rel="type"')
  })
  it('returns nothing if called incorrectly', async () => {
    fetch.mockResolvedValue(
      createFetchResponse(
        '<http://www.w3.org/ns/pim/space#Storage>; rel="type",<none>; rel="type"',
      ),
    )
    const res = await fetchLinkHeaders()
    expect(res).toEqual(none)
  })
  it('returns an empty list if no link headers are available', async () => {
    fetch.mockResolvedValue(createFetchResponse())
    const res = await fetchLinkHeaders()
    expect(res).toEqual(none)
  })
})
