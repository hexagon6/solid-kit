// import { within, userEvent, expect, waitFor } from 'storybook/test'

import LDContent from '$lib/components/LDContent.svelte'

export default {
  title: 'Solid/LDContent',
  component: LDContent,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const EmptyPublicTypeIndex = {
  args: {
    jsonld: [
      {
        '@id': 'http://localhost:3000/pod1/settings/publicTypeIndex.ttl',

        '@type': [
          'http://www.w3.org/ns/solid/terms#TypeIndex',
          'http://www.w3.org/ns/solid/terms#ListedDocument',
        ],
      },
    ],
    currentUrl: 'http://localhost:3000/pod1/settings/publicTypeIndex.ttl',
    select: () => {},
    iri: '',
  },
}

export const EmptyPreferencesFile = {
  args: {
    jsonld: [
      {
        '@id': 'http://localhost:3000/pod1/settings/prefs.ttl',
        '@type': ['http://www.w3.org/ns/pim/space#ConfigurationFile'],
        'http://purl.org/dc/terms/title': [
          {
            '@value': 'Preferences file',
          },
        ],
      },
    ],
    currentUrl: 'http://localhost:3000/pod1/settings/prefs.ttl',
    select: () => {},
    iri: '',
  },
}

export const PreferencesFileWithPrivateTypeIndex = {
  args: {
    jsonld: [
      {
        '@id': 'http://localhost:3000/pod1/settings/prefs.ttl',
        '@type': ['http://www.w3.org/ns/pim/space#ConfigurationFile'],
        'http://purl.org/dc/terms/title': [
          {
            '@value': 'Preferences file',
          },
        ],
      },
      {
        '@id': 'http://localhost:3000/pod1/profile/card#me',
        'http://www.w3.org/ns/solid/terms#privateTypeIndex': [
          {
            '@id': 'http://localhost:3000/pod1/settings/privateTypeIndex.ttl',
          },
        ],
      },
    ],
    currentUrl: 'http://localhost:3000/pod1/settings/prefs.ttl',
  },
}

export const EmptyPrivateTypeIndex = {
  args: {
    jsonld: [
      {
        '@id': 'http://localhost:3000/pod1/settings/privateTypeIndex.ttl',
        '@type': [
          'http://www.w3.org/ns/solid/terms#TypeIndex',
          'http://www.w3.org/ns/solid/terms#UnlistedDocument',
        ],
      },
    ],
    currentUrl: 'http://localhost:3000/pod1/settings/privateTypeIndex.ttl',
    select: () => {},
    iri: '',
  },
}

export const ExamplePublicTypeIndex = {
  args: {
    jsonld: [
      {
        '@id': 'https://webid.fet.li/todo/settings/publicTypeIndex.ttl',
        '@type': [
          'http://www.w3.org/ns/solid/terms#TypeIndex',
          'http://www.w3.org/ns/solid/terms#ListedDocument',
        ],
      },
      {
        '@id': 'https://webid.fet.li/todo/publicTypeIndex.ttl#thisisatest',
        '@type': ['http://www.w3.org/ns/solid/terms#TypeRegistration'],
        'http://www.w3.org/ns/solid/terms#forClass': [
          {
            '@id': 'https://www.w3.org/2002/12/cal/ical#Vtodo',
          },
        ],
        'http://www.w3.org/ns/solid/terms#instance': [
          {
            '@id': 'https://webid.fet.li/todo/public/films',
          },
        ],
      },
      {
        '@id': 'https://webid.fet.li/todo/publicTypeIndex.ttl#thisisanothertest',
        '@type': ['http://www.w3.org/ns/solid/terms#TypeRegistration'],
        'http://www.w3.org/ns/solid/terms#forClass': [
          {
            '@id': 'https://www.w3.org/2002/12/cal/ical#Vtodo',
          },
        ],
        'http://www.w3.org/ns/solid/terms#instance': [
          {
            '@id': 'https://webid.fet.li/todo/public/hack-the-promise',
          },
        ],
      },
    ],
    currentUrl: 'https://webid.fet.li/todo/settings/publicTypeIndex.ttl',
  },
}
