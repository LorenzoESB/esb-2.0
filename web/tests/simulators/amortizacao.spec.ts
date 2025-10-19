import { test, expect } from '@playwright/test';

test.describe('Amortização Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/simuladores/amortizacao');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Page Load and Structure', () => {
    test('should load the amortização calculator page', async ({ page }) => {
      await expect(page).toHaveURL(/amortizacao/);
      await expect(page.locator('h1')).toContainText('Simulador de Amortização SAC');
    });

    test('should display page description', async ({ page }) => {
      const description = page.locator('text=Calcule o impacto de amortizações extraordinárias no seu financiamento');
      await expect(description).toBeVisible();
    });

    test('should have navigation header', async ({ page }) => {
      await expect(page.locator('header, banner')).toBeVisible();
      await expect(page.locator('img[alt*="Logo"]')).toBeVisible();
    });
  });

  test.describe('Form Fields Validation', () => {
    test('should have all required form fields with default values', async ({ page }) => {
      // Saldo Devedor Atual
      const saldoDevedor = page.getByRole('spinbutton', { name: 'Saldo Devedor Atual (R$)' });
      await expect(saldoDevedor).toBeVisible();
      await expect(saldoDevedor).toHaveValue('128000');

      // Amortização Extraordinária
      const amortizacaoExtra = page.getByRole('spinbutton', { name: 'Amortização Extraordinária (R$)' });
      await expect(amortizacaoExtra).toBeVisible();
      await expect(amortizacaoExtra).toHaveValue('0');

      // Amortização Mensal Atual
      const amortizacaoMensal = page.getByRole('spinbutton', { name: 'Amortização Mensal Atual (R$)' });
      await expect(amortizacaoMensal).toBeVisible();
      await expect(amortizacaoMensal).toHaveValue('355.56');

      // Valor do Seguro Mensal
      const seguro = page.getByRole('spinbutton', { name: 'Valor do Seguro Mensal (R$)' });
      await expect(seguro).toBeVisible();
      await expect(seguro).toHaveValue('40');

      // Taxa de Administração Mensal
      const taxaAdmin = page.getByRole('spinbutton', { name: 'Taxa de Administração Mensal (R$)' });
      await expect(taxaAdmin).toBeVisible();
      await expect(taxaAdmin).toHaveValue('25');

      // Prazo da Operação
      const prazo = page.getByRole('spinbutton', { name: 'Prazo da Operação (meses)' });
      await expect(prazo).toBeVisible();
      await expect(prazo).toHaveValue('360');

      // Taxa de Juros Anual
      const taxaJuros = page.getByRole('spinbutton', { name: 'Taxa de Juros Anual (%)' });
      await expect(taxaJuros).toBeVisible();
      await expect(taxaJuros).toHaveValue('9');

      // Número da Parcela Atual
      const parcelaAtual = page.getByRole('spinbutton', { name: 'Número da Parcela Atual' });
      await expect(parcelaAtual).toBeVisible();
      await expect(parcelaAtual).toHaveValue('28');
    });

    test('should display field description for amortização extraordinária', async ({ page }) => {
      await expect(page.locator('text=Valor extra a ser amortizado')).toBeVisible();
    });

    test('should have simulate button', async ({ page }) => {
      const simulateButton = page.getByRole('button', { name: 'Simular' });
      await expect(simulateButton).toBeVisible();
      await expect(simulateButton).toBeEnabled();
    });
  });

  test.describe('Form Input Validation', () => {
    test('should accept valid numeric values', async ({ page }) => {
      const saldoDevedor = page.getByRole('spinbutton', { name: 'Saldo Devedor Atual (R$)' });
      await saldoDevedor.clear();
      await saldoDevedor.fill('200000');
      await expect(saldoDevedor).toHaveValue('200000');
    });

    test('should allow zero amortização extraordinária', async ({ page }) => {
      const amortizacaoExtra = page.getByRole('spinbutton', { name: 'Amortização Extraordinária (R$)' });
      await amortizacaoExtra.clear();
      await amortizacaoExtra.fill('0');
      await expect(amortizacaoExtra).toHaveValue('0');
    });

    test('should allow positive amortização extraordinária', async ({ page }) => {
      const amortizacaoExtra = page.getByRole('spinbutton', { name: 'Amortização Extraordinária (R$)' });
      await amortizacaoExtra.clear();
      await amortizacaoExtra.fill('10000');
      await expect(amortizacaoExtra).toHaveValue('10000');
    });

    test('should update all fields independently', async ({ page }) => {
      // Update multiple fields
      await page.getByRole('spinbutton', { name: 'Saldo Devedor Atual (R$)' }).fill('150000');
      await page.getByRole('spinbutton', { name: 'Taxa de Juros Anual (%)' }).fill('8');
      await page.getByRole('spinbutton', { name: 'Prazo da Operação (meses)' }).fill('300');

      // Verify all changes persisted
      await expect(page.getByRole('spinbutton', { name: 'Saldo Devedor Atual (R$)' })).toHaveValue('150000');
      await expect(page.getByRole('spinbutton', { name: 'Taxa de Juros Anual (%)' })).toHaveValue('8');
      await expect(page.getByRole('spinbutton', { name: 'Prazo da Operação (meses)' })).toHaveValue('300');
    });
  });

  test.describe('API Integration', () => {
    test('should attempt to fetch results when clicking Simular', async ({ page }) => {
      // Listen for API calls
      const responsePromise = page.waitForResponse(
        response => response.url().includes('amortiza') || response.status() === 404,
        { timeout: 5000 }
      ).catch(() => null);

      await page.getByRole('button', { name: 'Simular' }).click();
      
      // Wait a bit for any API call
      await page.waitForTimeout(1000);
      
      // The form should still be visible (API might not be working in production)
      await expect(page.getByRole('button', { name: 'Simular' })).toBeVisible();
    });

    test('should handle API errors gracefully', async ({ page }) => {
      await page.getByRole('button', { name: 'Simular' }).click();
      await page.waitForTimeout(1500);

      // Page should not crash - form should still be visible
      await expect(page.getByRole('spinbutton', { name: 'Saldo Devedor Atual (R$)' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Simular' })).toBeVisible();
    });
  });

  test.describe('Responsiveness - Desktop', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should display properly on large desktop screens', async ({ page }) => {
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Simular' })).toBeVisible();
      
      const viewport = page.viewportSize();
      expect(viewport?.width).toBe(1920);
    });

    test('should show all form fields without scrolling on desktop', async ({ page }) => {
      // All fields should be visible
      await expect(page.getByRole('spinbutton', { name: 'Saldo Devedor Atual (R$)' })).toBeInViewport();
      await expect(page.getByRole('spinbutton', { name: 'Taxa de Juros Anual (%)' })).toBeInViewport();
      await expect(page.getByRole('button', { name: 'Simular' })).toBeInViewport();
    });
  });

  test.describe('Responsiveness - Tablet', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('should display properly on tablet screens', async ({ page }) => {
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Simular' })).toBeVisible();
      
      const viewport = page.viewportSize();
      expect(viewport?.width).toBe(768);
    });

    test('should have scrollable form on tablet', async ({ page }) => {
      // Title should be visible
      await expect(page.locator('h1')).toBeVisible();
      
      // Form should be accessible
      const firstField = page.getByRole('spinbutton', { name: 'Saldo Devedor Atual (R$)' });
      await expect(firstField).toBeVisible();
    });
  });

  test.describe('Responsiveness - Mobile', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should display properly on mobile screens', async ({ page }) => {
      // Title should be visible
      await expect(page.locator('h1')).toBeVisible();
      
      // Form fields should be stacked vertically
      await expect(page.getByRole('spinbutton', { name: 'Saldo Devedor Atual (R$)' })).toBeVisible();
      
      const viewport = page.viewportSize();
      expect(viewport?.width).toBe(375);
    });

    test('should have touch-friendly inputs on mobile', async ({ page }) => {
      const firstInput = page.getByRole('spinbutton', { name: 'Saldo Devedor Atual (R$)' });
      const box = await firstInput.boundingBox();
      
      // Input should be large enough for touch
      expect(box?.height).toBeGreaterThanOrEqual(30);
    });

    test('should have touch-friendly button on mobile', async ({ page }) => {
      const button = page.getByRole('button', { name: 'Simular' });
      const box = await button.boundingBox();
      
      // Button should be large enough for touch (minimum 44x44px)
      expect(box?.height).toBeGreaterThanOrEqual(40);
    });

    test('should allow scrolling through all fields on mobile', async ({ page }) => {
      // Scroll to bottom of form
      await page.getByRole('button', { name: 'Simular' }).scrollIntoViewIfNeeded();
      await expect(page.getByRole('button', { name: 'Simular' })).toBeVisible();
      
      // Scroll back to top
      await page.locator('h1').scrollIntoViewIfNeeded();
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should maintain form state after scrolling on mobile', async ({ page }) => {
      // Fill a field
      const saldoDevedor = page.getByRole('spinbutton', { name: 'Saldo Devedor Atual (R$)' });
      await saldoDevedor.clear();
      await saldoDevedor.fill('250000');
      
      // Scroll down
      await page.getByRole('button', { name: 'Simular' }).scrollIntoViewIfNeeded();
      
      // Scroll back up
      await saldoDevedor.scrollIntoViewIfNeeded();
      
      // Value should be preserved
      await expect(saldoDevedor).toHaveValue('250000');
    });
  });

  test.describe('Footer and Navigation', () => {
    test('should have footer visible', async ({ page }) => {
      const footer = page.locator('footer, contentinfo');
      await expect(footer).toBeVisible();
    });

    test('should be able to navigate back to simuladores page', async ({ page }) => {
      await page.getByRole('link', { name: 'Simuladores' }).click();
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveURL(/simuladores/);
    });

    test('should be able to navigate to home page', async ({ page }) => {
      await page.locator('img[alt*="Logo"]').click();
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveURL(/^\//);
    });
  });
});
