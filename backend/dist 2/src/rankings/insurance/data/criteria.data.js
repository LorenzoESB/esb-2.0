"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOTAL_CRITERIA_WEIGHT = exports.INSURANCE_CRITERIA = void 0;
exports.getCriterionByKey = getCriterionByKey;
exports.validateRawScores = validateRawScores;
exports.INSURANCE_CRITERIA = [
    {
        key: 'price_competitiveness',
        name: 'Preço Competitivo',
        weight: 2.5,
        type: 'numeric',
        description: 'Competitividade dos preços de franquia e mensalidade. Preços mais baixos recebem pontuações mais altas.',
    },
    {
        key: 'coverage_completeness',
        name: 'Cobertura Completa',
        weight: 2.5,
        type: 'numeric',
        description: 'Abrangência das coberturas oferecidas (roubo, colisão, incêndio, terceiros, vidros, etc.).',
    },
    {
        key: 'claim_process',
        name: 'Processo de Sinistro',
        weight: 2.0,
        type: 'numeric',
        description: 'Facilidade e rapidez no processo de abertura e resolução de sinistros.',
    },
    {
        key: 'customer_service',
        name: 'Atendimento ao Cliente',
        weight: 1.5,
        type: 'numeric',
        description: 'Qualidade do atendimento, disponibilidade de canais e tempo de resposta.',
    },
    {
        key: 'financial_strength',
        name: 'Solidez Financeira',
        weight: 1.5,
        type: 'numeric',
        description: 'Estabilidade financeira da seguradora e capacidade de pagamento de indenizações.',
    },
    {
        key: 'network_coverage',
        name: 'Rede de Oficinas',
        weight: 1.0,
        type: 'numeric',
        description: 'Número e qualidade de oficinas credenciadas disponíveis para reparo.',
    },
    {
        key: 'digital_services',
        name: 'Serviços Digitais',
        weight: 1.0,
        type: 'numeric',
        description: 'Qualidade do aplicativo móvel, portal online e serviços digitais oferecidos.',
    },
    {
        key: 'additional_benefits',
        name: 'Benefícios Adicionais',
        weight: 1.0,
        type: 'numeric',
        description: 'Serviços extras como carro reserva, assistência 24h, guincho ilimitado, descontos.',
    },
    {
        key: 'transparency',
        name: 'Transparência',
        weight: 1.5,
        type: 'numeric',
        description: 'Clareza nas informações sobre coberturas, exclusões e condições contratuais.',
    },
    {
        key: 'claim_approval_rate',
        name: 'Taxa de Aprovação',
        weight: 2.0,
        type: 'numeric',
        description: 'Percentual de sinistros aprovados e pagos em relação ao total de solicitações.',
    },
    {
        key: 'reputation',
        name: 'Reputação',
        weight: 1.5,
        type: 'numeric',
        description: 'Reputação no mercado baseada em avaliações de clientes e tempo de atuação.',
    },
];
exports.TOTAL_CRITERIA_WEIGHT = exports.INSURANCE_CRITERIA.reduce((sum, criterion) => sum + criterion.weight, 0);
function getCriterionByKey(key) {
    return exports.INSURANCE_CRITERIA.find((c) => c.key === key);
}
function validateRawScores(rawScores) {
    return exports.INSURANCE_CRITERIA.every((criterion) => {
        return rawScores.hasOwnProperty(criterion.key);
    });
}
//# sourceMappingURL=criteria.data.js.map