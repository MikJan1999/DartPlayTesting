import {test, expect, firefox} from '@playwright/test'

test.beforeEach(async ({ page }) => {
await page.goto('http://localhost:3000/');
})

test('Klik Graj', async ({ page }) => {
  await page.getByRole('link', { name: 'Graj' }).click();
  await expect(page).toHaveURL(/options/);
});

test('Klik O aplikacji', async ({ page }) => {
  await page.getByRole('link', { name: 'O aplikacji' }).click();
  await expect(page).toHaveURL(/about/);
});

test('Klik Historia zmian', async ({ page }) => {
  await page.getByRole('link', { name: 'Historia zmian' }).click();
  await expect(page).toHaveURL(/changelog/);
});