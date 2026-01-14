"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIGITAL_ACCOUNT_CRITERIA = void 0;
exports.DIGITAL_ACCOUNT_CRITERIA = [
    {
        key: 'tarifas',
        name: 'Tarifas e mensalidade',
        weight: 2.5,
        type: 'numeric',
        description: 'Avalia custo fixo mensal e isenções; notas maiores para contas realmente gratuitas',
    },
    {
        key: 'experiencia_digital',
        name: 'Experiência digital',
        weight: 1.5,
        type: 'scale',
        description: 'Qualidade do app, abertura 100% online, usabilidade e transparência das informações',
    },
    {
        key: 'servicos',
        name: 'Serviços essenciais',
        weight: 1.25,
        type: 'scale',
        description: 'Oferta de saques, TED/Pix, boletos e depósitos sem fricção para PF/PJ',
    },
    {
        key: 'cartao_credito',
        name: 'Cartão de crédito',
        weight: 1.0,
        type: 'boolean',
        description: 'Disponibilidade de crédito com anuidade zero e benefícios atrelados',
    },
    {
        key: 'investimentos',
        name: 'Investimentos e rendimento',
        weight: 0.75,
        type: 'scale',
        description: 'Facilidade para investir e rendimento automático do saldo',
    },
    {
        key: 'suporte',
        name: 'Suporte e reputação',
        weight: 1.0,
        type: 'scale',
        description: 'Atendimento humano, reputação e estabilidade reportada por clientes',
    },
];
//# sourceMappingURL=criteria.data.js.map