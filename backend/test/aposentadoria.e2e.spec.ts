import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { AposentadoriaModule } from '../src/simuladores/aposentadoria/aposentadoria.module';
import { ModoCalculoAposentadoria } from '../src/simuladores/aposentadoria/dto/simular-aposentadoria.dto';

describe('AposentadoriaController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env.test',
        }),
        AposentadoriaModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Configurar pipes globais (igual ao main.ts)
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /simuladores/aposentadoria/simular', () => {
    describe('Modo RECEBER - Casos de sucesso', () => {
      it('deve simular com dados válidos e retornar 200', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.RECEBER,
            idadeAtual: 28,
            idadeAposentadoria: 50,
            valorJaAcumulado: 50000,
            rendaMensalDesejada: 12000,
            incluirCenariosSaque: true,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body).toHaveProperty('parametros');
            expect(res.body).toHaveProperty('acumulacao');
            expect(res.body).toHaveProperty('usufruto');
            expect(res.body).toHaveProperty('sustentabilidade');
            expect(res.body).toHaveProperty('resumo');

            // Validar valores calculados
            expect(res.body.acumulacao.contribuicaoMensal).toBeCloseTo(
              2836.26,
              1,
            );
            expect(res.body.usufruto.rendaMensal).toBe(12000);
            expect(res.body.acumulacao.mesesContribuicao).toBe(264);
          });
      });

      it('deve simular sem reserva inicial', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.RECEBER,
            idadeAtual: 24,
            idadeAposentadoria: 50,
            valorJaAcumulado: 0,
            rendaMensalDesejada: 12000,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.acumulacao.valorFuturoReserva).toBe(0);
            expect(res.body.acumulacao.mesesContribuicao).toBe(312);
          });
      });

      it('deve calcular para diferentes idades', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.RECEBER,
            idadeAtual: 35,
            idadeAposentadoria: 60,
            valorJaAcumulado: 100000,
            rendaMensalDesejada: 8000,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.acumulacao.mesesContribuicao).toBe(300);
            expect(res.body.usufruto.rendaMensal).toBe(8000);
          });
      });
    });

    describe('Modo CONTRIBUIR - Casos de sucesso', () => {
      it('deve simular contribuição mensal e calcular renda futura', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.CONTRIBUIR,
            idadeAtual: 30,
            idadeAposentadoria: 55,
            valorJaAcumulado: 75000,
            contribuicaoMensal: 2500,
            incluirCenariosSaque: true,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.acumulacao.contribuicaoMensal).toBe(2500);
            expect(res.body.acumulacao.mesesContribuicao).toBe(300);
            expect(res.body.usufruto.rendaMensal).toBeGreaterThan(0);
            expect(res.body.sustentabilidade.cenarios.length).toBeGreaterThan(
              0,
            );
          });
      });

      it('deve calcular corretamente sem cenários de saque', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.CONTRIBUIR,
            idadeAtual: 40,
            idadeAposentadoria: 60,
            valorJaAcumulado: 0,
            contribuicaoMensal: 1500,
            incluirCenariosSaque: false,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.sustentabilidade.cenarios).toEqual([]);
            expect(
              res.body.sustentabilidade.rendimentoMensalPuro,
            ).toBeGreaterThan(0);
          });
      });
    });

    describe('Validações - Casos de erro', () => {
      it('deve retornar 400 quando modo de cálculo é inválido', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: 'INVALIDO',
            idadeAtual: 30,
            idadeAposentadoria: 55,
            valorJaAcumulado: 0,
            rendaMensalDesejada: 5000,
          })
          .expect(400)
          .expect((res) => {
            expect(res.body.message).toContain('modoCalculo');
          });
      });

      it('deve retornar 400 quando idade de aposentadoria <= idade atual', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.RECEBER,
            idadeAtual: 50,
            idadeAposentadoria: 50,
            valorJaAcumulado: 0,
            rendaMensalDesejada: 5000,
          })
          .expect(400)
          .expect((res) => {
            expect(res.body.message).toContain('maior que idade atual');
          });
      });

      it('deve retornar 400 quando idade de aposentadoria > expectativa de vida', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.RECEBER,
            idadeAtual: 30,
            idadeAposentadoria: 90,
            valorJaAcumulado: 0,
            rendaMensalDesejada: 5000,
          })
          .expect(400);
      });

      it('deve retornar 400 quando modo RECEBER sem rendaMensalDesejada', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.RECEBER,
            idadeAtual: 30,
            idadeAposentadoria: 55,
            valorJaAcumulado: 0,
          })
          .expect(400);
      });

      it('deve retornar 400 quando modo CONTRIBUIR sem contribuicaoMensal', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.CONTRIBUIR,
            idadeAtual: 30,
            idadeAposentadoria: 55,
            valorJaAcumulado: 0,
          })
          .expect(400);
      });

      it('deve retornar 400 quando idade atual é negativa', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.RECEBER,
            idadeAtual: -5,
            idadeAposentadoria: 55,
            valorJaAcumulado: 0,
            rendaMensalDesejada: 5000,
          })
          .expect(400);
      });

      it('deve retornar 400 quando valor já acumulado é negativo', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.RECEBER,
            idadeAtual: 30,
            idadeAposentadoria: 55,
            valorJaAcumulado: -1000,
            rendaMensalDesejada: 5000,
          })
          .expect(400);
      });

      it('deve retornar 400 quando renda mensal desejada é zero', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.RECEBER,
            idadeAtual: 30,
            idadeAposentadoria: 55,
            valorJaAcumulado: 0,
            rendaMensalDesejada: 0,
          })
          .expect(400);
      });

      it('deve rejeitar campos não permitidos', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.RECEBER,
            idadeAtual: 30,
            idadeAposentadoria: 55,
            valorJaAcumulado: 0,
            rendaMensalDesejada: 5000,
            campoInvalido: 'teste',
          })
          .expect(400)
          .expect((res) => {
            expect(res.body.message).toContain('campoInvalido');
          });
      });
    });

    describe('Transformação de tipos', () => {
      it('deve converter strings numéricas para números', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.RECEBER,
            idadeAtual: '30',
            idadeAposentadoria: '55',
            valorJaAcumulado: '50000',
            rendaMensalDesejada: '8000',
          })
          .expect(200)
          .expect((res) => {
            expect(typeof res.body.parametros.idadeAtual).toBe('number');
            expect(res.body.parametros.idadeAtual).toBe(30);
          });
      });

      it('deve converter string boolean para boolean', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.RECEBER,
            idadeAtual: 30,
            idadeAposentadoria: 55,
            valorJaAcumulado: 0,
            rendaMensalDesejada: 5000,
            incluirCenariosSaque: 'false',
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.sustentabilidade.cenarios).toEqual([]);
          });
      });
    });

    describe('Casos reais - Validação com exemplos do site', () => {
      it('deve reproduzir exemplo do site: 24 anos, aposentar 50, receber R$ 12.000', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.RECEBER,
            idadeAtual: 24,
            idadeAposentadoria: 50,
            valorJaAcumulado: 0,
            rendaMensalDesejada: 12000,
          })
          .expect(200)
          .expect((res) => {
            // Validar contra resultado esperado do site
            expect(res.body.acumulacao.valorTotalAcumulado).toBeCloseTo(
              2121726.04,
              0,
            );
            expect(res.body.acumulacao.contribuicaoMensal).toBeCloseTo(
              2836.26,
              1,
            );
          });
      });

      it('deve calcular aposentadoria jovem (20 anos)', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.CONTRIBUIR,
            idadeAtual: 20,
            idadeAposentadoria: 50,
            valorJaAcumulado: 0,
            contribuicaoMensal: 500,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.acumulacao.mesesContribuicao).toBe(360);
            expect(res.body.acumulacao.anosContribuicao).toBe(30);
            expect(res.body.usufruto.rendaMensal).toBeGreaterThan(0);
          });
      });

      it('deve calcular aposentadoria próxima (5 anos)', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.RECEBER,
            idadeAtual: 55,
            idadeAposentadoria: 60,
            valorJaAcumulado: 500000,
            rendaMensalDesejada: 6000,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.acumulacao.mesesContribuicao).toBe(60);
            // Com reserva alta, contribuição deve ser baixa ou até negativa
            // (reserva já é suficiente)
          });
      });
    });

    describe('Resposta Swagger', () => {
      it('deve retornar estrutura completa conforme documentação', () => {
        return request(app.getHttpServer())
          .post('/simuladores/aposentadoria/simular')
          .send({
            modoCalculo: ModoCalculoAposentadoria.RECEBER,
            idadeAtual: 30,
            idadeAposentadoria: 55,
            valorJaAcumulado: 10000,
            rendaMensalDesejada: 7000,
            incluirCenariosSaque: true,
          })
          .expect(200)
          .expect((res) => {
            const { body } = res;

            // Estrutura de parâmetros
            expect(body.parametros).toMatchObject({
              idadeAtual: expect.any(Number),
              idadeAposentadoria: expect.any(Number),
              valorJaAcumulado: expect.any(Number),
              taxaJurosMensal: expect.any(Number),
              taxaJurosAnual: expect.any(Number),
              expectativaVida: expect.any(Number),
            });

            // Estrutura de acumulação
            expect(body.acumulacao).toMatchObject({
              mesesContribuicao: expect.any(Number),
              anosContribuicao: expect.any(Number),
              contribuicaoMensal: expect.any(Number),
              valorFuturoReserva: expect.any(Number),
              valorFuturoContribuicoes: expect.any(Number),
              valorTotalAcumulado: expect.any(Number),
            });

            // Estrutura de usufruto
            expect(body.usufruto).toMatchObject({
              idadeInicio: expect.any(Number),
              idadeFim: expect.any(Number),
              mesesBeneficio: expect.any(Number),
              rendaMensal: expect.any(Number),
              valorTotalRecebido: expect.any(Number),
            });

            // Estrutura de sustentabilidade
            expect(body.sustentabilidade).toMatchObject({
              rendimentoMensalPuro: expect.any(Number),
              cenarios: expect.any(Array),
            });

            // Estrutura de resumo
            expect(body.resumo).toMatchObject({
              totalInvestido: expect.any(Number),
              totalRecebido: expect.any(Number),
              saldoPatrimonial: expect.any(Number),
            });
          });
      });
    });
  });
});
