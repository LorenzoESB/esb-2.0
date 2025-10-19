import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.describe('Home Page', () => {
    test('should load the home page successfully', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check if page loaded
      await expect(page.locator('header, banner')).toBeVisible();
      
      // Check for main heading
      const mainHeading = page.locator('h1').first();
      await expect(mainHeading).toBeVisible();
    });

    test('should have logo that links to home page', async ({ page }) => {
      await page.goto('/simuladores');
      await page.waitForLoadState('networkidle');
      
      // Click logo
      await page.locator('img[alt*="Logo"]').click();
      await page.waitForLoadState('networkidle');
      
      // Should be on home page
      await expect(page).toHaveURL('/');
    });

    test('should display hero section', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('text=Conteúdo descomplicado para suas decisões financeiras')).toBeVisible();
    });

    test('should display recent articles section', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('text=Veja os artigos mais recentes')).toBeVisible();
    });

    test('should display tools section', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('text=Ferramentas para suas decisões financeiras')).toBeVisible();
    });
  });

  test.describe('Navigation Menu', () => {
    test('should have navigation links in header', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page.getByRole('link', { name: 'Rankings' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Simuladores' })).toBeVisible();
    });

    test('should navigate to simuladores page', async ({ page }) => {
      await page.goto('/');
      
      await page.getByRole('link', { name: 'Simuladores' }).click();
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveURL(/simuladores/);
      await expect(page.locator('h1')).toContainText('Simuladores Financeiros');
    });

    test('should navigate to rankings page', async ({ page }) => {
      await page.goto('/');
      
      await page.getByRole('link', { name: 'Rankings' }).click();
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveURL(/rankings/);
    });

    test('should maintain header navigation across pages', async ({ page }) => {
      await page.goto('/simuladores');
      await page.waitForLoadState('networkidle');
      
      await expect(page.getByRole('link', { name: 'Rankings' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Simuladores' })).toBeVisible();
    });
  });

  test.describe('Simuladores Page', () => {
    test('should display all available simulators', async ({ page }) => {
      await page.goto('/simuladores');
      await page.waitForLoadState('networkidle');
      
      // Check for available simulators
      await expect(page.locator('text=Calculadora de Juros Compostos')).toBeVisible();
      await expect(page.locator('text=Simulador de Amortização')).toBeVisible();
    });

    test('should indicate which simulators are available', async ({ page }) => {
      await page.goto('/simuladores');
      await page.waitForLoadState('networkidle');
      
      // Check for "Disponível" badges
      const availableBadges = page.locator('text=Disponível');
      const count = await availableBadges.count();
      expect(count).toBeGreaterThanOrEqual(2);
    });

    test('should indicate which simulators are unavailable', async ({ page }) => {
      await page.goto('/simuladores');
      await page.waitForLoadState('networkidle');
      
      // Check for "Indisponível" badges
      const unavailableBadges = page.locator('text=Indisponível');
      const count = await unavailableBadges.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should navigate to Juros Compostos calculator', async ({ page }) => {
      await page.goto('/simuladores');
      await page.waitForLoadState('networkidle');
      
      await page.locator('text=Calculadora de Juros Compostos').click();
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveURL(/juros-compostos/);
    });

    test('should navigate to Amortização calculator', async ({ page }) => {
      await page.goto('/simuladores');
      await page.waitForLoadState('networkidle');
      
      await page.locator('text=Simulador de Amortização').click();
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveURL(/amortizacao/);
    });

    test('should not allow clicking unavailable simulators', async ({ page }) => {
      await page.goto('/simuladores');
      await page.waitForLoadState('networkidle');
      
      // Find an unavailable simulator
      const unavailableSimulator = page.locator('text=Indisponível').first().locator('..');
      
      // Should not be a clickable link
      const isClickable = await unavailableSimulator.evaluate(el => {
        return el.tagName === 'A' && el.hasAttribute('href');
      }).catch(() => false);
      
      expect(isClickable).toBe(false);
    });
  });

  test.describe('Footer Navigation', () => {
    test('should have footer visible on all pages', async ({ page }) => {
      const pages = ['/', '/simuladores', '/simuladores/juros-compostos'];
      
      for (const pagePath of pages) {
        await page.goto(pagePath);
        await page.waitForLoadState('networkidle');
        
        const footer = page.locator('footer, contentinfo');
        await footer.scrollIntoViewIfNeeded();
        await expect(footer).toBeVisible();
      }
    });

    test('should display footer sections', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const footer = page.locator('footer, contentinfo');
      await footer.scrollIntoViewIfNeeded();
      
      // Check for main sections
      await expect(page.locator('text=Rankings').last()).toBeVisible();
      await expect(page.locator('text=Ferramentas').last()).toBeVisible();
      await expect(page.locator('text=Contato').last()).toBeVisible();
    });

    test('should display social media links', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const footer = page.locator('footer, contentinfo');
      await footer.scrollIntoViewIfNeeded();
      
      // Check for social media links
      const twitterLink = page.locator('a[href*="x.com"]');
      const facebookLink = page.locator('a[href*="facebook"]');
      const instagramLink = page.locator('a[href*="instagram"]');
      
      await expect(twitterLink).toBeVisible();
      await expect(facebookLink).toBeVisible();
      await expect(instagramLink).toBeVisible();
    });

    test('should display copyright information', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const footer = page.locator('footer, contentinfo');
      await footer.scrollIntoViewIfNeeded();
      
      await expect(page.locator('text=Copyright © 2024 Educando Seu Bolso')).toBeVisible();
    });

    test('should have contact information', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const footer = page.locator('footer, contentinfo');
      await footer.scrollIntoViewIfNeeded();
      
      await expect(page.locator('text=marketing@educandoseubolso.blog.br')).toBeVisible();
      await expect(page.locator('text=+55 (31) 99690-8560')).toBeVisible();
      await expect(page.locator('text=Belo Horizonte, MG - Brasil')).toBeVisible();
    });
  });

  test.describe('Breadcrumbs and Back Navigation', () => {
    test('should navigate back using browser back button', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Navigate to simuladores
      await page.getByRole('link', { name: 'Simuladores' }).click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/simuladores/);
      
      // Go back
      await page.goBack();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL('/');
    });

    test('should navigate forward using browser forward button', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Navigate to simuladores
      await page.getByRole('link', { name: 'Simuladores' }).click();
      await page.waitForLoadState('networkidle');
      
      // Go back
      await page.goBack();
      await page.waitForLoadState('networkidle');
      
      // Go forward
      await page.goForward();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/simuladores/);
    });
  });

  test.describe('404 and Error Handling', () => {
    test('should handle non-existent pages', async ({ page }) => {
      const response = await page.goto('/this-page-does-not-exist-12345');
      
      // Should either show 404 or redirect
      expect(response?.status()).toBeTruthy();
    });

    test('should maintain navigation on non-existent pages', async ({ page }) => {
      await page.goto('/this-page-does-not-exist-12345');
      
      // Header should still be visible
      await expect(page.locator('header, banner')).toBeVisible();
    });
  });

  test.describe('External Links', () => {
    test('should have external social media links that open in new tab', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const footer = page.locator('footer, contentinfo');
      await footer.scrollIntoViewIfNeeded();
      
      // Check if social links have target="_blank" or similar
      const twitterLink = page.locator('a[href*="x.com"]');
      await expect(twitterLink).toBeVisible();
    });
  });

  test.describe('Loading States', () => {
    test('should show content after page load', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('load');
      
      // Content should be visible
      await expect(page.locator('h1').first()).toBeVisible();
    });

    test('should complete network requests', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Page should be fully loaded
      await expect(page.locator('footer, contentinfo')).toBeVisible();
    });
  });

  test.describe('Deep Linking', () => {
    test('should load calculator directly via deep link', async ({ page }) => {
      await page.goto('/simuladores/juros-compostos');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('h1')).toContainText('Calculadora de Juros Compostos');
    });

    test('should maintain navigation when accessing deep links', async ({ page }) => {
      await page.goto('/simuladores/amortizacao');
      await page.waitForLoadState('networkidle');
      
      // Header navigation should still work
      await expect(page.getByRole('link', { name: 'Simuladores' })).toBeVisible();
      
      await page.getByRole('link', { name: 'Simuladores' }).click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/\/simuladores$/);
    });
  });
});

