"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSimulationEmail = generateSimulationEmail;
function escapeHtml(unsafe) {
    if (unsafe === null || unsafe === undefined)
        return '';
    const str = String(unsafe);
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
function generateSimulationEmail(payload) {
    const { userName, simulationType, input, output, summary, createdAt } = payload;
    const dateStr = new Date(createdAt).toLocaleDateString('pt-BR');
    const formatData = (data) => {
        if (!data)
            return '<p>N/A</p>';
        return Object.entries(data)
            .map(([key, value]) => {
            if (value === null || value === undefined)
                return '';
            const label = escapeHtml(key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
            let displayValue = value;
            if (typeof value === 'object') {
                displayValue = JSON.stringify(value, null, 2);
            }
            return `
          <div style="margin-bottom: 8px;">
            <strong style="color: #555;">${label}:</strong> 
            <span>${escapeHtml(displayValue)}</span>
          </div>
        `;
        })
            .join('');
    };
    const safeUserName = escapeHtml(userName);
    const safeSimulationType = escapeHtml(simulationType.replace(/_/g, ' '));
    const safeSummary = escapeHtml(summary);
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; text-align: center; border-bottom: 3px solid #007bff; }
        .content { padding: 20px 0; }
        .section { margin-bottom: 25px; background: #fff; padding: 15px; border: 1px solid #eee; border-radius: 5px; }
        .section-title { margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 10px; color: #007bff; }
        .footer { text-align: center; font-size: 12px; color: #999; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Resultado da Simulação</h1>
          <p>${safeSimulationType}</p>
        </div>
        
        <div class="content">
          <p>Olá, <strong>${safeUserName}</strong>!</p>
          <p>Aqui está o resultado da sua simulação realizada em ${dateStr}.</p>
          
          <div class="section">
            <h3 class="section-title">Resumo</h3>
            <p>${safeSummary}</p>
          </div>

          <div class="section">
            <h3 class="section-title">Dados de Entrada</h3>
            ${formatData(input)}
          </div>

          <div class="section">
            <h3 class="section-title">Resultados</h3>
            ${formatData(output)}
          </div>
        </div>

        <div class="footer">
          <p>Educando Seu Bolso - Educação Financeira</p>
          <p>Este é um email automático, por favor não responda.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
//# sourceMappingURL=simulation-result.template.js.map