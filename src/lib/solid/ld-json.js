import { filter, pipe as _, reduce } from 'ramda'

/**
 *  @typedef {{
 *   "@id": string,
 *   "@type": string,
 * }} JSONLDobject
 */

export const ldTake = (/** @type {string} IRI */ iri) => (/** @type {Object} */ o) =>
  iri in o ? o[iri]?.map((/** @type {JSONLDobject} */ i) => i['@id']).reduce((b, c) => c) : {}

/**
 * @typedef {Array<JSONLDobject>} JSONLDdocument
 */

/**
 * @typedef {function(string): JSONLDdocument} JSONLDProcessor
 */
export const ldSelf = (/** @type {string} iri */ id) => (/** @type {JSONLDdocument} */ jsonld) =>
  _(
    filter((n) => n['@id'] === id),
    reduce((p, c) => ({ ...p, ...c }), {}),
  )(Array.from(jsonld))
