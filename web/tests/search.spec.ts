import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Search Bar Visibility and Accessibility', () => {
    test('should have search input visible in header', async ({ page }) => {
      const searchInput = page.getByPlaceholder('Buscar...');
      await expect(searchInput).toBeVisible();
    });

    test('should have search button next to input', async ({ page }) => {
      const searchInput = page.getByPlaceholder('Buscar...');
      const searchButton = searchInput.locator('..').locator('button');
      await expect(searchButton).toBeVisible();
    });

    test('should allow typing in search field', async ({ page }) => {
      const searchInput = page.getByPlaceholder('Buscar...');
      await searchInput.fill('investimento');
      await expect(searchInput).toHaveValue('investimento');
    });

    test('should clear search field', async ({ page }) => {
      const searchInput = page.getByPlaceholder('Buscar...');
      await searchInput.fill('teste');
      await searchInput.clear();
      await expect(searchInput).toHaveValue('');
    });
  });

  test.describe('Search Interaction', () => {
    test('should submit search on button click', async ({ page }) => {
      const searchInput = page.getByPlaceholder('Buscar...');
      await searchInput.fill('juros compostos');
      
      const searchButton = searchInput.locator('..').locator('button');
      await searchButton.click();
      
      // Wait for any navigation or search results
      await page.waitForTimeout(500);
    });

    test('should submit search on Enter key', async ({ page }) => {
      const searchInput = page.getByPlaceholder('Buscar...');
      await searchInput.fill('amortização');
      await searchInput.press('Enter');
      
      // Wait for any navigation or search results
      await page.waitForTimeout(500);
    });

    test('should handle empty search gracefully', async ({ page }) => {
      const searchInput = page.getByPlaceholder('Buscar...');
      const searchButton = searchInput.locator('..').locator('button');
      
      // Click without entering text
      await searchButton.click();
      
      // Page should not crash
      await expect(searchInput).toBeVisible();
    });

    test('should handle special characters in search', async ({ page }) => {
      const searchInput = page.getByPlaceholder('Buscar...');
      await searchInput.fill('finanças & investimentos!');
      
      const searchButton = searchInput.locator('..').locator('button');
      await searchButton.click();
      
      await page.waitForTimeout(500);
      // Should not crash
      await expect(searchInput).toBeVisible();
    });
  });

  test.describe('Search Responsiveness', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should display search bar on mobile', async ({ page }) => {
      const searchInput = page.getByPlaceholder('Buscar...');
      await expect(searchInput).toBeVisible();
    });

    test('should have touch-friendly search button on mobile', async ({ page }) => {
      const searchInput = page.getByPlaceholder('Buscar...');
      const searchButton = searchInput.locator('..').locator('button');
      
      const box = await searchButton.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(30);
    });

    test('should allow typing on mobile keyboard', async ({ page }) => {
      const searchInput = page.getByPlaceholder('Buscar...');
      await searchInput.click();
      await searchInput.fill('mobile search test');
      await expect(searchInput).toHaveValue('mobile search test');
    });
  });

  test.describe('Search on Different Pages', () => {
    test('should have search available on simuladores page', async ({ page }) => {
      await page.goto('/simuladores');
      await page.waitForLoadState('networkidle');
      
      const searchInput = page.getByPlaceholder('Buscar...');
      await expect(searchInput).toBeVisible();
    });

    test('should have search available on calculator pages', async ({ page }) => {
      await page.goto('/simuladores/juros-compostos');
      await page.waitForLoadState('networkidle');
      
      const searchInput = page.getByPlaceholder('Buscar...');
      await expect(searchInput).toBeVisible();
    });

    test('should maintain search functionality across navigation', async ({ page }) => {
      // Start on home page
      const searchInput = page.getByPlaceholder('Buscar...');
      await searchInput.fill('test');
      
      // Navigate to another page
      await page.getByRole('link', { name: 'Simuladores' }).click();
      await page.waitForLoadState('networkidle');
      
      // Search should still be available
      await expect(page.getByPlaceholder('Buscar...')).toBeVisible();
    });
  });

  test.describe('Search UI/UX', () => {
    test('should have proper placeholder text', async ({ page }) => {
      const searchInput = page.getByPlaceholder('Buscar...');
      await expect(searchInput).toHaveAttribute('placeholder', 'Buscar...');
    });

    test('should focus search input when clicked', async ({ page }) => {
      const searchInput = page.getByPlaceholder('Buscar...');
      await searchInput.click();
      await expect(searchInput).toBeFocused();
    });

    test('should have search icon in button', async ({ page }) => {
      const searchInput = page.getByPlaceholder('Buscar...');
      const searchButton = searchInput.locator('..').locator('button');
      
      // Button should contain an image/icon
      const icon = searchButton.locator('img, svg');
      await expect(icon).toBeVisible();
    });
  });
});
