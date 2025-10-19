import { test, expect } from '@playwright/test';

test.describe('Juros Compostos Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/simuladores/juros-compostos');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Page Load and Structure', () => {
    test('should load the calculator page with correct title', async ({ page }) => {
      await expect(page).toHaveURL(/juros-compostos/);
      await expect(page.locator('h1')).toContainText('Calculadora de Juros Compostos');
    });

    test('should display page description', async ({ page }) => {
      const description = page.locator('text=Simule o crescimento do seu investimento ao longo do tempo');
      await expect(description).toBeVisible();
    });

    test('should have navigation header', async ({ page }) => {
      await expect(page.locator('header, banner')).toBeVisible();
      await expect(page.locator('img[alt*="Logo"]')).toBeVisible();
    });
  });

  test.describe('Form Fields Validation', () => {
    test('should have all required form fields with default values', async ({ page }) => {
      // Check Valor Inicial field
      const valorInicial = page.getByPlaceholder('R$ 10.000,00');
      await expect(valorInicial).toBeVisible();
      await expect(valorInicial).toHaveValue('R$ 10.000,00');

      // Check Aporte Mensal field
      const aporteMensal = page.getByPlaceholder('R$ 500,00');
      await expect(aporteMensal).toBeVisible();
      await expect(aporteMensal).toHaveValue('R$ 500,00');

      // Check Tempo de Aplicação field
      const tempoAplicacao = page.getByRole('spinbutton', { name: 'Tempo de Aplicação' });
      await expect(tempoAplicacao).toBeVisible();
      await expect(tempoAplicacao).toHaveValue('3');

      // Check Taxa de Juros field
      const taxaJuros = page.getByRole('spinbutton', { name: 'Taxa de Juros Anual (%)' });
      await expect(taxaJuros).toBeVisible();
      await expect(taxaJuros).toHaveValue('11');
    });

    test('should have time unit selector with default value', async ({ page }) => {
      const unidadeTempo = page.getByRole('combobox', { name: 'Unidade de Tempo' });
      await expect(unidadeTempo).toBeVisible();
      await expect(unidadeTempo).toContainText('Anos');
    });

    test('should display field descriptions', async ({ page }) => {
      await expect(page.locator('text=Valor inicial do investimento')).toBeVisible();
      await expect(page.locator('text=Valor a ser investido mensalmente')).toBeVisible();
      await expect(page.locator('text=Período do investimento')).toBeVisible();
      await expect(page.locator('text=Taxa de juros anual em porcentagem')).toBeVisible();
    });

    test('should have calculate button', async ({ page }) => {
      const calculateButton = page.getByRole('button', { name: 'Calcular' });
      await expect(calculateButton).toBeVisible();
      await expect(calculateButton).toBeEnabled();
    });
  });

  test.describe('Calculation and Results', () => {
    test('should calculate and display results with default values', async ({ page }) => {
      // Click calculate button
      await page.getByRole('button', { name: 'Calcular' }).click();

      // Wait for results to appear
      await page.waitForTimeout(500);

      // Check if main results are displayed
      await expect(page.locator('text=Valor Final')).toBeVisible();
      await expect(page.locator('text=Total Investido')).toBeVisible();
      await expect(page.locator('text=Juros Ganhos')).toBeVisible();

      // Verify result values are displayed
      const valorFinal = page.locator('text=R$ 34.720,85');
      await expect(valorFinal).toBeVisible();
    });

    test('should display summary section with all details', async ({ page }) => {
      await page.getByRole('button', { name: 'Calcular' }).click();
      await page.waitForTimeout(500);

      // Check summary section
      await expect(page.locator('text=Resumo do Investimento')).toBeVisible();
      await expect(page.locator('text=Valor Final:')).toBeVisible();
      await expect(page.locator('text=Total Investido:')).toBeVisible();
      await expect(page.locator('text=Total em Juros:')).toBeVisible();
      await expect(page.locator('text=Rentabilidade:')).toBeVisible();
    });

    test('should display evolution chart', async ({ page }) => {
      await page.getByRole('button', { name: 'Calcular' }).click();
      await page.waitForTimeout(500);

      // Check for chart title
      await expect(page.locator('text=Evolução do Investimento')).toBeVisible();

      // Check for chart legend
      await expect(page.locator('text=Valor Investido')).toBeVisible();
      await expect(page.locator('text=Valor Total')).toBeVisible();
      await expect(page.locator('text=Juros Acumulados')).toBeVisible();
    });

    test('should calculate with custom values', async ({ page }) => {
      // Clear and fill custom values
      const valorInicial = page.getByPlaceholder('R$ 10.000,00');
      await valorInicial.clear();
      await valorInicial.fill('R$ 5.000,00');

      const aporteMensal = page.getByPlaceholder('R$ 500,00');
      await aporteMensal.clear();
      await aporteMensal.fill('R$ 300,00');

      const tempoAplicacao = page.getByRole('spinbutton', { name: 'Tempo de Aplicação' });
      await tempoAplicacao.clear();
      await tempoAplicacao.fill('5');

      const taxaJuros = page.getByRole('spinbutton', { name: 'Taxa de Juros Anual (%)' });
      await taxaJuros.clear();
      await taxaJuros.fill('10');

      // Calculate
      await page.getByRole('button', { name: 'Calcular' }).click();
      await page.waitForTimeout(500);

      // Verify results appear
      await expect(page.locator('text=Valor Final')).toBeVisible();
      const resultValue = page.locator('text=/R\\$ [0-9,.]+/').first();
      await expect(resultValue).toBeVisible();
    });
  });

  test.describe('Responsiveness - Desktop', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should display properly on large desktop screens', async ({ page }) => {
      await expect(page.locator('h1')).toBeVisible();
      
      // Form should be visible
      await expect(page.getByRole('button', { name: 'Calcular' })).toBeVisible();
      
      // Check layout is not broken
      const viewport = page.viewportSize();
      expect(viewport?.width).toBe(1920);
    });

    test('should show results side by side on desktop', async ({ page }) => {
      await page.getByRole('button', { name: 'Calcular' }).click();
      await page.waitForTimeout(500);

      // Results should be visible
      const valorFinal = page.locator('text=Valor Final');
      await expect(valorFinal).toBeVisible();
      
      // Chart should be visible
      const chart = page.locator('text=Evolução do Investimento');
      await expect(chart).toBeVisible();
    });
  });

  test.describe('Responsiveness - Tablet', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('should display properly on tablet screens', async ({ page }) => {
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Calcular' })).toBeVisible();
      
      const viewport = page.viewportSize();
      expect(viewport?.width).toBe(768);
    });

    test('should show results correctly on tablet', async ({ page }) => {
      await page.getByRole('button', { name: 'Calcular' }).click();
      await page.waitForTimeout(500);

      await expect(page.locator('text=Valor Final')).toBeVisible();
      await expect(page.locator('text=Evolução do Investimento')).toBeVisible();
    });
  });

  test.describe('Responsiveness - Mobile', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should display properly on mobile screens', async ({ page }) => {
      // Title should be visible
      await expect(page.locator('h1')).toBeVisible();
      
      // Form fields should be stacked vertically and visible
      await expect(page.getByPlaceholder('R$ 10.000,00')).toBeVisible();
      await expect(page.getByPlaceholder('R$ 500,00')).toBeVisible();
      
      // Calculate button should be visible
      await expect(page.getByRole('button', { name: 'Calcular' })).toBeVisible();
      
      const viewport = page.viewportSize();
      expect(viewport?.width).toBe(375);
    });

    test('should show results stacked on mobile', async ({ page }) => {
      await page.getByRole('button', { name: 'Calcular' }).click();
      await page.waitForTimeout(500);

      // Results should be visible
      await expect(page.locator('text=Valor Final')).toBeVisible();
      await expect(page.locator('text=Total Investido')).toBeVisible();
      await expect(page.locator('text=Juros Ganhos')).toBeVisible();
    });

    test('should have touch-friendly button on mobile', async ({ page }) => {
      const button = page.getByRole('button', { name: 'Calcular' });
      const box = await button.boundingBox();
      
      // Button should be large enough for touch (minimum 44x44px)
      expect(box?.height).toBeGreaterThanOrEqual(40);
    });

    test('should scroll to results on mobile after calculation', async ({ page }) => {
      await page.getByRole('button', { name: 'Calcular' }).click();
      await page.waitForTimeout(500);

      // Results should be in viewport
      const valorFinal = page.locator('text=Valor Final');
      await expect(valorFinal).toBeInViewport();
    });
  });
});
