# E2E Testing with Playwright

## Overview
This directory contains end-to-end (E2E) tests for the Educando Seu Bolso web application using Playwright.

## Quick Start

### Install Dependencies
```bash
# Install Playwright browsers (first time only)
pnpm exec playwright install --with-deps
```

### Run Tests
```bash
# Run all tests (all browsers)
pnpm test

# Run with UI mode (recommended for development)
pnpm test:ui

# Run in headed mode (see the browser)
pnpm test:headed

# Run specific browser
pnpm test:chromium
pnpm test:firefox
pnpm test:webkit
```

## Test Organization

```
tests/
├── README.md                    # This file
├── example.spec.ts             # Basic example tests
├── navigation.spec.ts          # Navigation and page loading tests
└── simulators/                 # Simulator-specific tests
    ├── juros-compostos.spec.ts # Compound interest calculator tests
    └── amortizacao.spec.ts     # Amortization calculator tests
```

## Browsers Tested

### Desktop
- ✅ **Chromium** - Chrome/Edge engine (default)
- ✅ **Firefox** - Mozilla Firefox
- ✅ **WebKit** - Safari engine (macOS/iOS)
- ⚡ **Microsoft Edge** - Windows Edge browser
- ⚡ **Google Chrome** - Branded Chrome

### Mobile
- 📱 **Mobile Chrome** - Android Pixel 5 viewport
- 📱 **Mobile Safari** - iOS iPhone 12 viewport
- 📱 **iPad** - iPad Pro viewport

## Writing Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/your-page');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    await page.fill('[name="input"]', 'value');

    // Act
    await page.click('button[type="submit"]');

    // Assert
    await expect(page.locator('.result')).toBeVisible();
    await expect(page.locator('.result')).toContainText('Expected Text');
  });
});
```

### Best Practices

1. **Use semantic selectors**
   ```typescript
   // Good
   await page.getByRole('button', { name: 'Calculate' }).click();
   await page.getByLabel('Initial Value').fill('10000');
   
   // Avoid
   await page.click('.btn-primary');
   await page.fill('#input-1', '10000');
   ```

2. **Wait for states, not timeouts**
   ```typescript
   // Good
   await page.waitForLoadState('networkidle');
   await expect(page.locator('.result')).toBeVisible();
   
   // Avoid
   await page.waitForTimeout(3000);
   ```

3. **Keep tests independent**
   - Each test should be able to run in isolation
   - Don't rely on test execution order
   - Clean up after tests if needed

4. **Use descriptive test names**
   ```typescript
   // Good
   test('should show validation error when email is invalid', ...);
   
   // Avoid
   test('test 1', ...);
   ```

## Running Specific Tests

```bash
# Run a specific test file
pnpm test tests/simulators/juros-compostos.spec.ts

# Run tests matching a pattern
pnpm test --grep "calculator"

# Run a specific test by name
pnpm test --grep "should calculate compound interest"

# Run in debug mode
pnpm test:debug tests/example.spec.ts
```

## Viewing Reports

```bash
# Open HTML report
pnpm test:report
```

The report includes:
- Test results for all browsers
- Screenshots on failure
- Video recordings on failure
- Trace files for debugging
- Execution time metrics

## CI/CD Integration

Tests automatically run on:
- Push to `main` or `master` branches
- Pull requests

### GitHub Actions
- Runs tests on Chromium, Firefox, and WebKit
- Uploads reports as artifacts
- Retries failed tests twice
- Parallel execution across browsers

### Viewing CI Results
1. Go to GitHub Actions tab
2. Select the workflow run
3. Download artifacts to view reports

## Debugging Tests

### UI Mode (Recommended)
```bash
pnpm test:ui
```
Features:
- Visual test runner
- Time travel through test steps
- Pick locators visually
- Edit tests in real-time

### Debug Mode
```bash
pnpm test:debug
```
Opens Playwright Inspector for step-by-step debugging.

### Generate Tests (Codegen)
```bash
pnpm test:codegen
```
Record actions in the browser and generate test code.

## Common Commands

| Command | Description |
|---------|-------------|
| `pnpm test` | Run all tests |
| `pnpm test:ui` | Open UI mode |
| `pnpm test:headed` | Run with visible browser |
| `pnpm test:debug` | Debug mode |
| `pnpm test:chromium` | Test Chromium only |
| `pnpm test:firefox` | Test Firefox only |
| `pnpm test:webkit` | Test WebKit (Safari) only |
| `pnpm test:mobile` | Test mobile viewports |
| `pnpm test:desktop` | Test desktop browsers |
| `pnpm test:report` | View HTML report |
| `pnpm test:codegen` | Generate test code |

## Troubleshooting

### Tests failing locally but passing in CI
- Check if you're using the latest browser versions
- Verify environment variables match CI
- Run `pnpm exec playwright install --force`

### Timeout errors
- Increase timeout in `playwright.config.ts`
- Use `test.slow()` for specific slow tests
- Check network connectivity

### Flaky tests
- Use `test.only()` to isolate
- Add explicit waits: `await expect(locator).toBeVisible()`
- Check for race conditions

### Browser not found
```bash
# Reinstall browsers
pnpm exec playwright install --with-deps
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [CI/CD Setup](https://playwright.dev/docs/ci)

## Support

For questions or issues:
1. Check existing tests for examples
2. Review Playwright documentation
3. Open an issue in the repository
4. Ask the team in Slack/Discord
