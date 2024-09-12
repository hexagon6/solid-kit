export function load({ params: { target } }) {
  console.log('target', target)
  return {
    redirect: {
      target,
    },
  }
}

export const csr = true
export const ssr = false
