<script>
  import { ldSelf, ldTake } from '$lib/solid/ld-json'

  let { jsonld, currentUrl, select, iri = '' } = $props()

  /** @type {string} url of document*/
  let url = $state(currentUrl)
  /** @type {import('$lib/solid/ld-json').JSONLDdocument}*/
  let document = $state(jsonld)
  let self = $derived.by(() => ldSelf(url)(document))

  let forClassType = $state(iri)

  const solid = {
    TypeIndex: 'http://www.w3.org/ns/solid/terms#TypeIndex',
    TypeRegistration: 'http://www.w3.org/ns/solid/terms#TypeRegistration',
    forClass: 'http://www.w3.org/ns/solid/terms#forClass',
    instance: 'http://www.w3.org/ns/solid/terms#instance',
  }
</script>

{#snippet listLDTypes(/** @type {{ [x: string]: any; }} */ self)}
  {#if self && self['@type']}
    <div>
      types:
      <ul>
        {#each self['@type'] as type}
          <li>
            {type}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
{/snippet}

{#snippet listforClassTypes(
  /** @type {Array<object>} */ typeRegistrations,
  /** @type {string} an IRI which defines the forClass */ forClassDefinition,
)}
  {@const forClasses = typeRegistrations
    .map(ldTake(forClassDefinition))
    .reduce((b, c) => ({ ...b, [c]: true }), {})}
  {#each Object.keys(forClasses) as type}
    <button
      class:selected={forClassType === type}
      onclick={() => {
        forClassType = type
      }}>{type}</button
    >
  {/each}
{/snippet}

{#snippet listTypeRegistrations(
  /** @type {import('$lib/solid/ld-json').JSONLDobject[]} */ typeRegistrations,
  /** @type {string} an IRI which defines the forClass */ forClassDefinition,
)}
  <ul>
    {#each typeRegistrations as registration}
      {@const forClass = ldTake(forClassDefinition)(registration)}
      {@const instance = ldTake(solid.instance)(registration)}
      {#if forClass === forClassType}
        <li>
          <button
            onclick={() =>
              select({
                id: registration['@id'],
                instance,
                forClass: forClassType,
              })}
          >
            {instance}
          </button>
        </li>
      {/if}
    {/each}
  </ul>
{/snippet}

<div>
  {currentUrl}
  {@render listLDTypes(self)}
  <div>
    {#if self['@type']?.includes(solid.TypeIndex)}
      {@const typeRegistrations = Array.from(document).filter((item) =>
        item['@type'].includes(solid.TypeRegistration),
      )}
      {#if !forClassType}please select a forClass type{/if}
      {@render listforClassTypes(typeRegistrations, solid.forClass)}
      {@render listTypeRegistrations(typeRegistrations, solid.forClass)}
    {/if}
  </div>
  <!-- <h3>Self-descriptive part</h3>
    <pre>{JSON.stringify(Object.keys(self), null, 2)}</pre>
    <h3>file content:</h3>
    <pre>{JSON.stringify(jsonld, null, 2)}</pre> -->
</div>

<style>
  button.selected {
    background-color: greenyellow !important;
    color: black;
  }
</style>
