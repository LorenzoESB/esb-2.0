import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Simulators and Rankings (e2e smoke)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /simuladores/juros-compostos should calculate successfully', async () => {
    const payload = {
      nome: 'Teste',
      email: 'teste@example.com',
      valorInicial: 10000,
      aporteMensal: 500,
      tempoAplicacao: 3,
      tempoAplicacaoUnidade: 'anos',
      taxaJuros: 11,
    };

    const res = await request(app.getHttpServer())
      .post('/simuladores/juros-compostos')
      .send(payload)
      .expect(200);

    expect(res.body).toHaveProperty('data');
    expect(res.body.data?.resumo?.valorTotalFinalBruto).toBeGreaterThan(0);
  });

  it('POST /simuladores/amortizacao should return simplified amortization', async () => {
    const payload = {
      nome: 'Teste',
      email: 'teste@example.com',
      valorFinanciamento: 128000,
      taxaJurosAnual: 9,
      prazoMeses: 360,
      seguroMensal: 40,
      taxaAdministracao: 25,
      parcelaAtual: 28,
      saldoDevedorAtual: 120000,
      amortizacoesExtraordinarias: [{ valor: 22000, mesOcorrencia: 28 }],
    };

    const res = await request(app.getHttpServer())
      .post('/simuladores/amortizacao')
      .send(payload)
      .expect(200);

    expect(res.body.resumo).toHaveProperty('novaPrestacao');
    expect(res.body.resumo).toHaveProperty('prazoRestante');
    expect(res.body.resumo).toHaveProperty('saldoDevedor');
  });

  it('POST /simuladores/emprestimo/simular should accept PF payload', async () => {
    const payload = {
      tipoPessoa: 'PF',
      tipoEmprego: 'clt',
      valorDesejado: 10000,
      prazoMeses: 24,
      renda: 5000,
      nome: 'Teste',
      email: 'teste@example.com',
    };
    const res = await request(app.getHttpServer())
      .post('/simuladores/emprestimo/simular')
      .send(payload)
      .expect(200);
    expect(res.body).toHaveProperty('totalOfertas');
    expect(res.body.totalOfertas).toBeGreaterThan(0);
  });

  it('POST /simuladores/financiamento-imovel/simular should accept payload', async () => {
    const payload = {
      valorImovel: 500000,
      valorEntrada: 100000,
      prazoMeses: 360,
      rendaMensal: 10000,
      nome: 'Teste',
      email: 'teste@example.com',
    };
    const res = await request(app.getHttpServer())
      .post('/simuladores/financiamento-imovel/simular')
      .send(payload)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('POST /simuladores/financiamento-veiculos/simular should accept payload', async () => {
    const payload = {
      valorVeiculo: 80000,
      valorEntrada: 20000,
      prazoMeses: 48,
      rendaMensal: 8000,
      tipoVeiculo: 'novo',
      nome: 'Teste',
      email: 'teste@example.com',
    };
    const res = await request(app.getHttpServer())
      .post('/simuladores/financiamento-veiculos/simular')
      .send(payload)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('POST /simuladores/contas-digitais/pessoa-fisica should accept payload', async () => {
    const payload = {
      tipoPessoa: 'fisica',
      temConta: false,
      tarifa: 0,
      saques: 3,
      nDocs: 0,
      nTeds: 10,
      debito: true,
      nDepositos: 2,
      credito: true,
      investimentos: false,
      transferencias: true,
      depCheque: false,
      nome: 'Teste',
      email: 'teste@example.com',
    };
    const res = await request(app.getHttpServer())
      .post('/simuladores/contas-digitais/pessoa-fisica')
      .send(payload)
      .expect(201);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('POST /simuladores/contas-digitais/pessoa-juridica should accept payload', async () => {
    const payload = {
      tipoPessoa: 'juridica',
      temConta: true,
      tarifa: 29.9,
      saques: 2,
      nDocs: 0,
      nTeds: 20,
      debito: true,
      boletos: 50,
      maquininha: true,
      folhaPagamento: false,
      cartaoVirtual: true,
      nome: 'Empresa Teste',
      email: 'empresa@example.com',
    };
    const res = await request(app.getHttpServer())
      .post('/simuladores/contas-digitais/pessoa-juridica')
      .send(payload)
      .expect(201);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('POST /simuladores/taxa-maquininha/simular should accept payload', async () => {
    const payload = {
      venda_debito: 5000,
      venda_credito_vista: 3000,
      venda_credito_parcelado: 2000,
      numero_parcelas: 6,
      nome: 'Teste',
      email: 'teste@example.com',
    };
    const res = await request(app.getHttpServer())
      .post('/simuladores/taxa-maquininha/simular')
      .send(payload)
      .expect(200);
    expect(res.body).toHaveProperty('total');
    expect(res.body.total).toBeGreaterThan(0);
  });

  it('POST /simuladores/combustivel/comparar should accept payload', async () => {
    const payload = {
      nome: 'Teste',
      email: 'teste@example.com',
      precoGasolina: 5.49,
      precoEtanol: 3.99,
      consumoGasolina: 12,
      consumoEtanol: 8,
    };
    const res = await request(app.getHttpServer())
      .post('/simuladores/combustivel/comparar')
      .send(payload)
      .expect(200);
    expect(res.body).toHaveProperty('mensagem');
  });

  it('GET /rankings/insurance should return list', async () => {
    const res = await request(app.getHttpServer())
      .get('/rankings/insurance')
      .expect(200);
    expect(res.body).toHaveProperty('items');
    expect(res.body.total).toBeGreaterThan(0);
  });

  it('GET /rankings/pedagios should return list', async () => {
    const res = await request(app.getHttpServer())
      .get('/rankings/pedagios')
      .expect(200);
    expect(res.body).toHaveProperty('items');
    expect(res.body.total).toBeGreaterThan(0);
  });

  it('GET /rankings/assinatura-carro should return list', async () => {
    const res = await request(app.getHttpServer())
      .get('/rankings/assinatura-carro')
      .expect(200);
    expect(res.body).toHaveProperty('items');
    expect(res.body.total).toBeGreaterThan(0);
  });
  it('GET /rankings/card-machines should return ranking list', async () => {
    const res = await request(app.getHttpServer())
      .get('/rankings/card-machines')
      .expect(200);

    expect(res.body).toHaveProperty('items');
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.total).toBeGreaterThan(0);
  });

  it('GET /rankings/contas-digitais should return ranking list', async () => {
    const res = await request(app.getHttpServer())
      .get('/rankings/contas-digitais')
      .expect(200);

    expect(res.body).toHaveProperty('items');
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.total).toBeGreaterThan(0);
  });
});
