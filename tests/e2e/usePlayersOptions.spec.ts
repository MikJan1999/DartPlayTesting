import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/options/players/4/game/301');

});


test('Renders the configplayer screen', async ({ page }) => {

    const label = page.locator('label');

    await expect(label).toHaveCount(4);
    await expect(label.nth(0)).toHaveText('Uczestnik 1');
    await expect(label.nth(1)).toHaveText('Uczestnik 2');
    await expect(label.nth(2)).toHaveText('Uczestnik 3');
    await expect(label.nth(3)).toHaveText('Uczestnik 4');
});



test('renders correct number of inputs based on :num param', async ({ page }) => {

  const inputs = page.locator('input[type="text"]');
  await expect(inputs).toHaveCount(4);
});



test('input values are correctly updated', async ({ page }) => {


  const inputs = page.locator('input[type="text"]');

  await inputs.nth(0).fill('John Doe');
  await inputs.nth(1).fill('Anna');
  await inputs.nth(2).fill('Mike');
  await inputs.nth(3).fill('Sara');

  await expect(inputs.nth(0)).toHaveValue('John Doe');
  await expect(inputs.nth(1)).toHaveValue('Anna');
  await expect(inputs.nth(2)).toHaveValue('Mike');
  await expect(inputs.nth(3)).toHaveValue('Sara');
});


test('submit button is disabled until all player names are filled', async ({ page }) => {

  const inputs = page.locator('input[type="text"]');
  const submitButton = page.locator('button[type="submit"]');

  await expect(submitButton).toBeDisabled();

  await inputs.nth(0).fill('John');
  await inputs.nth(1).fill('Anna');
  await inputs.nth(2).fill('Mike');

  await expect(submitButton).toBeDisabled();

  await inputs.nth(3).fill('Sara');

  await expect(submitButton).toBeEnabled();
});