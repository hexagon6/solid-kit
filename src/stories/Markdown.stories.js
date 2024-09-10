// import { within, userEvent, expect, waitFor } from '@storybook/test'

import Markdown from '../lib/components/Markdown.svelte'

export default {
  title: 'Markdown',
  component: Markdown,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const MarkdownText = {
  args: {
    parse: `# Heading
> this is markdown

## here

[a link](#here)
    `,
  },
}
