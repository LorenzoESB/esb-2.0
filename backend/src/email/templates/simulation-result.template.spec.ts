import { generateSimulationEmail } from './simulation-result.template';
import { SimulationEmailPayload } from '../dto/simulation-email-payload.dto';
import { SimulatorType } from '@prisma/client';

describe('generateSimulationEmail', () => {
  const basePayload: SimulationEmailPayload = {
    simulationType: SimulatorType.AMORTIZACAO,
    userEmail: 'test@example.com',
    userName: 'Test User',
    input: { valor: 1000 },
    output: { resultado: 2000 },
    summary: 'Test Summary',
    createdAt: new Date('2023-01-01T12:00:00Z'),
  };

  it('should generate valid HTML with correct data', () => {
    const html = generateSimulationEmail(basePayload);
    expect(html).toContain('Test User');
    expect(html).toContain('AMORTIZACAO'); // Should be replaced/formatted
    expect(html).toContain('Test Summary');
    expect(html).toContain('1000');
    expect(html).toContain('2000');
  });

  it('should escape HTML in user input', () => {
    const payload = {
      ...basePayload,
      userName: '<script>alert("xss")</script>',
      summary: '<b>Bold</b>',
      input: { field: '<img src=x onerror=alert(1)>' },
    };

    const html = generateSimulationEmail(payload);

    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    
    expect(html).not.toContain('<b>Bold</b>');
    expect(html).toContain('&lt;b&gt;Bold&lt;/b&gt;');

    expect(html).not.toContain('<img src=x');
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
  });

  it('should handle null/undefined values gracefully', () => {
    const payload = {
      ...basePayload,
      input: { field1: null, field2: undefined, field3: 'valid' },
    };

    const html = generateSimulationEmail(payload);
    expect(html).toContain('valid');
    // Should not crash
  });
});
