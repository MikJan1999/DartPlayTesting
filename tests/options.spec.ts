import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/options');
});





test('Renders the options screen', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'home' })).toBeVisible();
  await expect(page.getByText('Konfiguracja uczestników')).toBeVisible();
  await expect(page.getByText('Ilość graczy')).toBeVisible();
  await expect(page.getByText('Rodzaj rozgrywki')).toBeVisible();

  await expect(page.getByRole('button', { name: 'Przejdź dalej', exact: true })).toBeVisible();

  const chips = [
    '2','3','4','5','6',
    '301','501','701','1001',
    'cricket','All numbers'
  ];

  for (const c of chips) {
    await expect(page.getByRole('radio', { name: c, exact: true })).toBeVisible();
  }
});





test('Next button disabled until both options selected', async ({ page }) => {
  const next = page.getByRole('button', { name: 'Przejdź dalej', exact: true });
  await expect(next).toBeDisabled();

  await page.getByRole('radio', { name: '2', exact: true }).click();
  await expect(next).toBeDisabled();

  await page.getByRole('radio', { name: '301', exact: true }).click();
  await expect(next).toBeEnabled();
});





test('Only one player chip active at a time', async ({ page }) => {
  const p2 = page.getByRole('radio', { name: '2', exact: true });
  const p3 = page.getByRole('radio', { name: '3', exact: true });

  await p2.click();
  await expect(p2).toHaveAttribute('aria-checked', 'true');

  await p3.click();
  await expect(p3).toHaveAttribute('aria-checked', 'true');
  await expect(p2).toHaveAttribute('aria-checked', 'false');
});

test('Only one game mode active at a time', async ({ page }) => {
  const m301 = page.getByRole('radio', { name: '301', exact: true });
  const m501 = page.getByRole('radio', { name: '501', exact: true });

  await m301.click();
  await expect(m301).toHaveAttribute('aria-checked', 'true');

  await m501.click();
  await expect(m501).toHaveAttribute('aria-checked', 'true');
  await expect(m301).toHaveAttribute('aria-checked', 'false');
});





test('Clicking the same chip twice keeps it selected', async ({ page }) => {
  const chip = page.getByRole('radio', { name: '2', exact: true });

  await chip.click();
  await chip.click();

  await expect(chip).toHaveAttribute('aria-checked', 'true');
});




test('All chips have correct ARIA attributes', async ({ page }) => {
  const radios = page.getByRole('radio');
  await expect(radios).toHaveCount(11);

  for (let i = 0; i < 11; i++) {
    await expect(radios.nth(i)).toHaveAttribute('role', 'radio');
    await expect(radios.nth(i)).toHaveAttribute('aria-checked');
  }
});

 


test('Navigates to players screen after selecting options', async ({ page }) => {
  await page.getByRole('radio', { name: '2', exact: true }).click();
  await page.getByRole('radio', { name: '301', exact: true }).click();
  await page.getByRole('button', { name: 'Przejdź dalej', exact: true }).click();

  await expect(page).toHaveURL(/players/);
});





test('Combination of choice', async ({ page }) => {
  const players = ['2', '3', '4', '5', '6'];
  const modes = ['301', '501', '701', '1001', 'cricket', 'All numbers'];

  for (const p of players) {
    for (const m of modes) {
      await page.getByRole('radio', { name: p, exact: true }).click();
      await page.getByRole('radio', { name: m, exact: true }).click();

      const next = page.getByRole('button', { name: 'Przejdź dalej', exact: true });
      await expect(next).toBeEnabled();
    }
  }
});
