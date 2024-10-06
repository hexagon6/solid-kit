import { expect, test } from '@playwright/test'
import cssConfig from '../.community-solid-server.config.json' with { type: 'json' }

const loadSeed = async () => {
  const {
    default: [seed],
  } = await import(`../${cssConfig.seedConfig}`, { assert: { type: 'json' } })
  return seed
}

test('login authorize logout works', async ({ page }) => {
  const seed = await loadSeed()
  const [{ name: pod1 }] = seed.pods
  await page.goto('/')
  // click on login page link
  await page.getByRole('link', { name: 'Login Page' }).click()
  // Enter webid oidcIssuer URL
  await page.getByLabel('Enter your webid').fill(cssConfig.baseUrl)
  await page.getByLabel('Enter your webid').press('Enter')
  // confirm webid selection
  await page.getByRole('button', { name: '✅ set' }).click()
  // Log in to oidcIssuer
  await page.getByRole('button', { name: 'Login to http://localhost:' }).click()
  // navigates to oidcIssuer service, Log in with credentials
  await page.getByLabel('Email').fill(seed.email)
  await page.getByLabel('Email').press('Tab')
  await page.getByLabel('Password').fill(seed.password)
  await page.getByRole('button', { name: 'Log in' }).click()
  // select the first webid
  await page.getByText(`${cssConfig.baseUrl}/${pod1}/profile/card#me`).click()
  // authorize app access to pod
  await page.getByRole('button', { name: 'Authorize' }).click()
  // Select webid
  // wait for redirection to settle
  await page.waitForURL('http://localhost:4173/')
  // check webid
  await page.getByText(`${cssConfig.baseUrl}/${pod1}/profile/card#me`).click()
  // check pod
  await page.getByText(`${cssConfig.baseUrl}/${pod1}/`, { exact: true }).click()
  // go to login page
  await page.getByRole('link', { name: 'Login Page' }).click()
  // go back
  await page.getByRole('button', { name: 'go back' }).click()
  // go to login page again
  await page.getByRole('link', { name: 'Login Page' }).click()
  // log out
  await page.getByRole('button', { name: 'Log out' }).click()
})
