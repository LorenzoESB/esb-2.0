import { test, expect } from '@playwright/test';

/**
 * Example E2E tests for Educando Seu Bolso
 * These tests demonstrate best practices for Playwright testing
 */

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Educando Seu Bolso/i);
  });

  test('should have navigation menu', async ({ page }) => {
    await page.goto('/');
    
    // Check for main navigation elements
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page, viewport }) => {
    // This test will run on all configured mobile viewports
    await page.goto('/');
    
    if (viewport && viewport.width < 768) {
      // Mobile-specific checks
      const mobileMenu = page.getByRole('button', { name: /menu/i });
      await expect(mobileMenu).toBeVisible();
    }
  });
});

test.describe('Navigation', () => {
  test('should navigate to simulators page', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to simulators
    await page.getByRole('link', { name: /simuladores/i }).click();
    
    // Verify URL changed
    await expect(page).toHaveURL(/simuladores/);
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/');
    
    // Check for h1
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    
    // Should focus on an interactive element
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement);
  });
});

test.describe('Performance', () => {
  test('should load main page within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });
});
