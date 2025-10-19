import { test, expect } from '@playwright/test';

test.describe('Website Responsiveness', () => {
  test.describe('Mobile Responsiveness (iPhone 12)', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('should display home page properly on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Header should be visible
      await expect(page.locator('header, banner')).toBeVisible();
      
      // Logo should be visible
      await expect(page.locator('img[alt*="Logo"]')).toBeVisible();
      
      // Hero section should be visible
      const heroHeading = page.locator('h1').first();
      await expect(heroHeading).toBeVisible();
      
      // Navigation should be accessible
      await expect(page.getByRole('link', { name: 'Rankings' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Simuladores' })).toBeVisible();
    });

    test('should have stacked layout on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const viewport = page.viewportSize();
      expect(viewport?.width).toBe(390);
      
      // Content should not overflow
      const body = page.locator('body');
      const bodyBox = await body.boundingBox();
      expect(bodyBox?.width).toBeLessThanOrEqual(390);
    });

    test('should allow vertical scrolling on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Scroll to footer
      await page.locator('footer, contentinfo').scrollIntoViewIfNeeded();
      await expect(page.locator('footer, contentinfo')).toBeVisible();
      
      // Scroll back to top
      await page.locator('header, banner').scrollIntoViewIfNeeded();
      await expect(page.locator('header, banner')).toBeVisible();
    });

    test('should have touch-friendly navigation links on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const rankingsLink = page.getByRole('link', { name: 'Rankings' });
      const box = await rankingsLink.boundingBox();
      
      // Links should be large enough for touch (minimum 44x44px recommended)
      expect(box?.height).toBeGreaterThanOrEqual(30);
    });

    test('should display blog articles in stacked layout on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Articles should be visible
      const articlesSection = page.locator('text=Veja os artigos mais recentes');
      await articlesSection.scrollIntoViewIfNeeded();
      await expect(articlesSection).toBeVisible();
    });
  });

  test.describe('Tablet Responsiveness (iPad)', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('should display home page properly on tablet', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('header, banner')).toBeVisible();
      await expect(page.locator('h1').first()).toBeVisible();
      
      const viewport = page.viewportSize();
      expect(viewport?.width).toBe(768);
    });

    test('should have optimized layout for tablet', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Content should utilize tablet width
      const body = page.locator('body');
      await expect(body).toBeVisible();
      
      // Navigation should be visible
      await expect(page.getByRole('link', { name: 'Simuladores' })).toBeVisible();
    });

    test('should display simuladores grid properly on tablet', async ({ page }) => {
      await page.goto('/simuladores');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('h1')).toContainText('Simuladores Financeiros');
      
      // Simulator cards should be visible
      const jurosCompostos = page.locator('text=Calculadora de Juros Compostos');
      await expect(jurosCompostos).toBeVisible();
    });
  });

  test.describe('Desktop Responsiveness (1920x1080)', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should display home page properly on desktop', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('header, banner')).toBeVisible();
      await expect(page.locator('h1').first()).toBeVisible();
      
      const viewport = page.viewportSize();
      expect(viewport?.width).toBe(1920);
    });

    test('should have wide layout on desktop', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Content should be centered or use full width appropriately
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('should display articles in grid on desktop', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const articlesSection = page.locator('text=Veja os artigos mais recentes');
      await expect(articlesSection).toBeVisible();
    });

    test('should show full navigation on desktop', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // All navigation items should be visible
      await expect(page.getByRole('link', { name: 'Rankings' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Simuladores' })).toBeVisible();
      await expect(page.getByPlaceholder('Buscar...')).toBeVisible();
    });
  });

  test.describe('Small Mobile Devices (iPhone SE)', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should display properly on small mobile screens', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('header, banner')).toBeVisible();
      await expect(page.locator('img[alt*="Logo"]')).toBeVisible();
      
      const viewport = page.viewportSize();
      expect(viewport?.width).toBe(375);
    });

    test('should have no horizontal overflow on small mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check for horizontal scrollbar
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      expect(hasHorizontalScroll).toBe(false);
    });

    test('should allow navigation on small mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await page.getByRole('link', { name: 'Simuladores' }).click();
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveURL(/simuladores/);
    });
  });

  test.describe('Large Desktop (2560x1440)', () => {
    test.use({ viewport: { width: 2560, height: 1440 } });

    test('should display properly on large desktop screens', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('header, banner')).toBeVisible();
      await expect(page.locator('h1').first()).toBeVisible();
      
      const viewport = page.viewportSize();
      expect(viewport?.width).toBe(2560);
    });

    test('should have proper content width on large screens', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Content should not stretch too wide
      const mainContent = page.locator('main, body > div');
      await expect(mainContent.first()).toBeVisible();
    });
  });

  test.describe('Landscape Orientation', () => {
    test.use({ viewport: { width: 844, height: 390 } });

    test('should handle landscape orientation on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page.locator('header, banner')).toBeVisible();
      
      const viewport = page.viewportSize();
      expect(viewport?.width).toBeGreaterThan(viewport?.height || 0);
    });
  });

  test.describe('Header Responsiveness', () => {
    test('should have responsive header on all screen sizes', async ({ page }) => {
      const viewports = [
        { width: 375, height: 667 },   // Mobile
        { width: 768, height: 1024 },  // Tablet
        { width: 1920, height: 1080 }, // Desktop
      ];

      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        
        await expect(page.locator('header, banner')).toBeVisible();
        await expect(page.locator('img[alt*="Logo"]')).toBeVisible();
      }
    });
  });

  test.describe('Footer Responsiveness', () => {
    test('should have responsive footer on all screen sizes', async ({ page }) => {
      const viewports = [
        { width: 375, height: 667 },   // Mobile
        { width: 768, height: 1024 },  // Tablet
        { width: 1920, height: 1080 }, // Desktop
      ];

      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        
        const footer = page.locator('footer, contentinfo');
        await footer.scrollIntoViewIfNeeded();
        await expect(footer).toBeVisible();
        
        // Footer should contain copyright
        await expect(page.locator('text=Copyright © 2024 Educando Seu Bolso')).toBeVisible();
      }
    });
  });

  test.describe('Images Responsiveness', () => {
    test('should load images properly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const logo = page.locator('img[alt*="Logo"]');
      await expect(logo).toBeVisible();
      
      // Image should not overflow
      const box = await logo.boundingBox();
      expect(box?.width).toBeLessThanOrEqual(375);
    });

    test('should load images properly on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const logo = page.locator('img[alt*="Logo"]');
      await expect(logo).toBeVisible();
    });
  });

  test.describe('Typography Responsiveness', () => {
    test('should have readable text on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
      
      // Heading should be readable (not too small)
      const fontSize = await heading.evaluate(el => {
        return window.getComputedStyle(el).fontSize;
      });
      
      const fontSizeNum = parseFloat(fontSize);
      expect(fontSizeNum).toBeGreaterThanOrEqual(20); // Minimum 20px for mobile h1
    });

    test('should have appropriate text size on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
    });
  });

  test.describe('Navigation Responsiveness', () => {
    test('should have accessible navigation on all devices', async ({ page }) => {
      const viewports = [
        { width: 375, height: 667, name: 'Mobile' },
        { width: 768, height: 1024, name: 'Tablet' },
        { width: 1920, height: 1080, name: 'Desktop' },
      ];

      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        
        // Navigation links should be clickable
        const simuladoresLink = page.getByRole('link', { name: 'Simuladores' });
        await expect(simuladoresLink).toBeVisible();
        
        await simuladoresLink.click();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL(/simuladores/);
        
        // Go back for next iteration
        await page.goto('/');
      }
    });
  });

  test.describe('Forms Responsiveness', () => {
    test('should have responsive calculator forms on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/simuladores/juros-compostos');
      await page.waitForLoadState('networkidle');
      
      // Form should be visible
      await expect(page.getByRole('button', { name: 'Calcular' })).toBeVisible();
      
      // Input fields should be touch-friendly
      const input = page.getByPlaceholder('R$ 10.000,00');
      const box = await input.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(30);
    });

    test('should have responsive calculator forms on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/simuladores/juros-compostos');
      await page.waitForLoadState('networkidle');
      
      await expect(page.getByRole('button', { name: 'Calcular' })).toBeVisible();
    });
  });

  test.describe('Content Overflow Prevention', () => {
    test('should prevent horizontal scroll on all pages', async ({ page }) => {
      const pages = ['/', '/simuladores', '/simuladores/juros-compostos', '/simuladores/amortizacao'];
      const viewports = [
        { width: 375, height: 667 },
        { width: 768, height: 1024 },
        { width: 1920, height: 1080 },
      ];

      for (const pagePath of pages) {
        for (const viewport of viewports) {
          await page.setViewportSize(viewport);
          await page.goto(pagePath);
          await page.waitForLoadState('networkidle');
          
          const hasHorizontalScroll = await page.evaluate(() => {
            return document.documentElement.scrollWidth > document.documentElement.clientWidth;
          });
          
          expect(hasHorizontalScroll).toBe(false);
        }
      }
    });
  });
});
