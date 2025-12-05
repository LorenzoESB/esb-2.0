import { Maquininha } from '../interfaces/maquininha.interface';
import { ModeloCobranca, TipoFaixa } from '../enums/modelo-cobranca.enum';

/**
 * IMPORTANTE: Este é apenas um arquivo de exemplo/template
 *
 * Para popular com dados reais, você precisa:
 * 1. Acessar o Django admin ou banco de dados PostgreSQL do projeto legado
 * 2. Exportar todos os dados de:
 *    - Maquina (models.Maquina)
 *    - Plano (models.Plano)
 *    - Taxa (models.Taxa)
 *    - FaixaFaturamento (models.FaixaFaturamento)
 *    - Marca/Empresa (core.models.Marca)
 *    - Bandeiras, TipoConexao, FormaRecebimento, etc.
 * 3. Converter para o formato TypeScript abaixo
 *
 * Comandos úteis para exportar do Django:
 *
 * ```bash
 * # Via Django shell
 * python manage.py shell
 *
 * # Depois:
 * from apps.maquininhas.models import Maquina, Plano
 * import json
 *
 * # Exportar maquininhas
 * maquinas = Maquina.objects.filter(ativo=True).prefetch_related('planos', 'bandeiras', 'empresa')
 * # Serializar e salvar em JSON
 *
 * # OU via SQL direto no PostgreSQL:
 * COPY (SELECT row_to_json(t) FROM (SELECT * FROM maquininhas_maquina WHERE ativo = true) t) TO '/tmp/maquinas.json';
 * ```
 */

/**
 * Lista de todas as maquininhas disponíveis
 *
 * TODO: Popular com dados reais do Django
 *
 * Estrutura esperada para cada maquininha:
 * - Dados básicos (id, nome, ativo, etc.)
 * - Empresa/Marca completa
 * - Array de planos (cada um com suas taxas e faixas)
 * - Arrays de bandeiras, tipos de conexão, formas de recebimento
 */
export const MAQUININHAS: Maquininha[] = [
  // EXEMPLO 1: Maquininha com plano simples (taxa padrão)
  {
    id: 1,
    nome: 'Moderninha Pro',
    ativo: true,
    empresa: {
      id: 1,
      nome: 'PagSeguro',
      cnpj: '08.561.701/0001-01',
      logo: 'https://example.com/logos/pagseguro.png',
      parceiro: true,
    },
    valor_leitor: 258.80,
    valor_promocional: 12.90,
    valor_mensalidade: 0,
    valor_transacao: 0,
    possibilidade_parcelamento: 12,
    mensalidade_condicional: false,
    minimo_sem_mensalidade: null,
    taxa_condicional: false,
    minimo_sem_taxa: null,
    taxa: null,
    chip: true,
    tarja: true,
    NFC: true,
    fio: false,
    imprime_recibo: true,
    precisa_de_telefone: false,
    email_recibo: true,
    sms_recibo: false,
    possivel_antecipacao: true,
    opcao_ecommerce: false,
    taxas_transparentes: true,
    vale_refeicao: false,
    afiliacao_a_banco: false,
    sem_mensalidade: true,
    PF: true,
    PJ: true,
    garantia: 1,
    planos: [
      {
        id: 1,
        nome: 'Plano Básico',
        ativo: true,
        taxa_desconto_debito: 0.0299, // 2,99%
        taxa_desconto_credito_vista: 0.0399, // 3,99%
        taxa_adicional_parcela: 0.0099, // 0,99% por parcela adicional
        dias_repasse_debito: 1,
        dias_repasse_credito: 30,
        dias_repasse_credito_parc: 30,
        tipo_dias_credito: {
          id: 1,
          tipo: 'Dias Corridos',
        },
        tipo_recebimento_parcelado: false, // Tudo de uma vez
        modelo_cobranca: ModeloCobranca.TAXA_PADRAO,
        antecipado: false,
        tipo_faixa: TipoFaixa.PRECO,
        faixa_faturamento: [],
        taxa_valor_excedente: 0,
        taxas: [], // Usa taxa_adicional_parcela
        segmentos: [],
        avaliacao: 8.5,
        url: 'https://pagseguro.uol.com.br/maquininha',
        grupo: 1,
      },
    ],
    bandeiras: [
      { nome: 'Visa', classeCss: 'visa', imagem: '' },
      { nome: 'Mastercard', classeCss: 'mastercard', imagem: '' },
      { nome: 'Elo', classeCss: 'elo', imagem: '' },
      { nome: 'American Express', classeCss: 'amex', imagem: '' },
      { nome: 'Hipercard', classeCss: 'hipercard', imagem: '' },
    ],
    tipo_conexao: [
      { nome: 'Wi-Fi' },
      { nome: '4G' },
      { nome: 'Bluetooth' },
    ],
    forma_recebimento: [
      { nome: 'Conta PagSeguro' },
      { nome: 'Conta Bancária' },
    ],
    transparencia: 9,
    url_avaliacao: 'https://blog.gerentedesonhos.com.br/moderninha-pro',
    observacao: 'Maquininha completa com NFC e impressora',
    imagem: 'https://example.com/maquininhas/moderninha-pro.png',
    cupom: 'PROMO2024',
    atualizado_em: new Date('2024-11-15'),
  },

  // EXEMPLO 2: Maquininha com faixa de faturamento
  {
    id: 2,
    nome: 'InfinitePay',
    ativo: true,
    empresa: {
      id: 2,
      nome: 'InfinitePay',
      cnpj: '32.088.115/0001-75',
      logo: 'https://example.com/logos/infinitepay.png',
      parceiro: true,
    },
    valor_leitor: 0, // Gratuita
    valor_promocional: null,
    valor_mensalidade: 0,
    valor_transacao: 0,
    possibilidade_parcelamento: 12,
    mensalidade_condicional: false,
    minimo_sem_mensalidade: null,
    taxa_condicional: false,
    minimo_sem_taxa: null,
    taxa: null,
    chip: true,
    tarja: true,
    NFC: true,
    fio: false,
    imprime_recibo: false,
    precisa_de_telefone: true,
    email_recibo: true,
    sms_recibo: true,
    possivel_antecipacao: true,
    opcao_ecommerce: false,
    taxas_transparentes: true,
    vale_refeicao: false,
    afiliacao_a_banco: false,
    sem_mensalidade: true,
    PF: true,
    PJ: true,
    garantia: null,
    planos: [
      {
        id: 2,
        nome: 'Plano por Faixa',
        ativo: true,
        taxa_desconto_debito: 0,
        taxa_desconto_credito_vista: 0,
        taxa_adicional_parcela: 0,
        dias_repasse_debito: 1,
        dias_repasse_credito: 1,
        dias_repasse_credito_parc: 1,
        tipo_dias_credito: {
          id: 1,
          tipo: 'Dias Corridos',
        },
        tipo_recebimento_parcelado: false,
        modelo_cobranca: ModeloCobranca.FAIXA,
        antecipado: true,
        tipo_faixa: TipoFaixa.TAXA, // Tipo 2
        faixa_faturamento: [
          {
            valor: 0.0199, // Taxa débito 1,99%
            minimo: 0,
            maximo: 5000,
            taxa_credito: 0.0279, // Taxa crédito 2,79%
            taxa_credito_p: 0.0379, // Taxa parcelado 2-6x: 3,79%
            taxa_credito_p2: 0.0479, // Taxa parcelado 7-12x: 4,79%
          },
          {
            valor: 0.0169, // Taxa débito 1,69%
            minimo: 5000.01,
            maximo: 15000,
            taxa_credito: 0.0249, // Taxa crédito 2,49%
            taxa_credito_p: 0.0349, // Taxa parcelado 2-6x: 3,49%
            taxa_credito_p2: 0.0449, // Taxa parcelado 7-12x: 4,49%
          },
        ],
        taxa_valor_excedente: 0,
        taxas: [],
        segmentos: [],
        avaliacao: 9.0,
        url: 'https://infinitepay.io',
        grupo: 1,
      },
    ],
    bandeiras: [
      { nome: 'Visa', classeCss: 'visa' },
      { nome: 'Mastercard', classeCss: 'mastercard' },
      { nome: 'Elo', classeCss: 'elo' },
    ],
    tipo_conexao: [
      { nome: 'Bluetooth' },
      { nome: 'Wi-Fi' },
    ],
    forma_recebimento: [
      { nome: 'Conta InfinitePay' },
      { nome: 'PIX' },
    ],
    transparencia: 10,
    url_avaliacao: 'https://blog.gerentedesonhos.com.br/infinitepay',
    observacao: 'Maquininha gratuita via celular',
    imagem: 'https://example.com/maquininhas/infinitepay.png',
    cupom: null,
    atualizado_em: new Date('2024-11-20'),
  },
];

/**
 * Retorna todas as maquininhas ativas
 */
export function getMaquininhasAtivas(): Maquininha[] {
  return MAQUININHAS.filter((m) => m.ativo);
}

/**
 * Retorna uma maquininha por ID
 */
export function getMaquininhaPorId(id: number): Maquininha | undefined {
  return MAQUININHAS.find((m) => m.id === id && m.ativo);
}

/**
 * INSTRUCÕES PARA POPULAR COM DADOS REAIS:
 *
 * 1. Acesse o banco PostgreSQL do Django:
 *    psql -U postgres -d gerentesonhos
 *
 * 2. Execute queries para exportar dados:
 *
 * -- Empresas
 * SELECT id, nome, cnpj, logo, parceiro FROM core_marca;
 *
 * -- Maquininhas
 * SELECT * FROM maquininhas_maquina WHERE ativo = true;
 *
 * -- Planos
 * SELECT * FROM maquininhas_plano WHERE ativo = true;
 *
 * -- Taxas
 * SELECT * FROM maquininhas_taxa;
 *
 * -- Faixas
 * SELECT * FROM maquininhas_faixafaturamento;
 *
 * -- Bandeiras
 * SELECT m.id as maquina_id, b.* FROM maquininhas_maquina_bandeiras mb
 * JOIN maquininhas_bandeira b ON mb.bandeira_id = b.id;
 *
 * 3. Ou use o Django management command para exportar JSON:
 *
 * python manage.py dumpdata maquininhas.Maquina maquininhas.Plano \
 *   maquininhas.Taxa maquininhas.FaixaFaturamento \
 *   --natural-foreign --natural-primary -o maquininhas_export.json
 *
 * 4. Converta o JSON para TypeScript usando script Node.js ou manualmente
 */
