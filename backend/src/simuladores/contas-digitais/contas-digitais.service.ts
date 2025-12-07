import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SimulatorType } from 'generated/prisma';
import {
  SimularContasDigitaisFisicaDto,
  SimularContasDigitaisJuridicaDto,
} from './dto/simular-contas-digitais.dto';
import { ResultadoContasDigitaisDto } from './dto/resultado-contas-digitais.dto';
import { ContasDigitaisData, TipoPessoa } from './data/contas-digitais.data';
import {
  calcularComparacaoContas,
  DadosSimulacaoFisica,
  DadosSimulacaoJuridica,
} from './calc/contas-digitais.calc';

/**
 * Serviço de simulação de contas digitais
 *
 * Compara diferentes contas digitais brasileiras com base no perfil
 * de uso do cliente e calcula a melhor opção por custo total
 */
@Injectable()
export class ContasDigitaisService {
  private readonly logger = new Logger(ContasDigitaisService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly contasDigitaisData: ContasDigitaisData,
  ) {}

  /**
   * Simula comparação de contas digitais para Pessoa Física
   *
   * Processo:
   * 1. Validar entrada
   * 2. Obter contas disponíveis para PF
   * 3. Calcular tarifa total para cada conta
   * 4. Filtrar contas que atendem aos requisitos
   * 5. Calcular economia em relação à conta atual (se aplicável)
   * 6. Ordenar por menor custo
   * 7. Salvar simulação no banco
   *
   * @param dto - Dados da simulação (Pessoa Física)
   * @returns Lista de contas ordenadas por menor custo
   */
  async simularPessoaFisica(
    dto: SimularContasDigitaisFisicaDto,
  ): Promise<ResultadoContasDigitaisDto[]> {
    try {
      this.logger.log('Starting digital accounts simulation (Pessoa Física)');
      this.logger.debug(`Input: ${JSON.stringify(dto)}`);

      // Preparar dados de simulação
      const dadosSimulacao: DadosSimulacaoFisica = {
        tipoPessoa: TipoPessoa.FISICA,
        temConta: dto.temConta,
        tarifa: dto.tarifa || 0,
        saques: dto.saques,
        nDocs: dto.nDocs,
        nTeds: dto.nTeds,
        nDepositos: dto.nDepositos,
        credito: dto.credito,
        debito: dto.debito,
        investimentos: dto.investimentos,
        transferencias: dto.transferencias,
        depCheque: dto.depCheque,
      };

      // Obter todas as contas disponíveis
      const todasContas = this.contasDigitaisData.obterTodasContas();
      this.logger.debug(`Total accounts in database: ${todasContas.length}`);

      // Calcular comparação
      const resultados = calcularComparacaoContas(todasContas, dadosSimulacao);

      this.logger.log(
        `Found ${resultados.length} matching accounts for Pessoa Física`,
      );

      if (resultados.length > 0) {
        this.logger.log(
          `Best option: ${resultados[0].nomeBanco} - ${resultados[0].nome} (R$ ${resultados[0].tarifaTotal.toFixed(2)}/month)`,
        );
      }

      // Salvar simulação no banco
      await this.salvarSimulacao(dto, resultados);

      return resultados;
    } catch (error) {
      this.logger.error(
        'Error in digital accounts simulation (PF)',
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Simula comparação de contas digitais para Pessoa Jurídica
   *
   * Processo:
   * 1. Validar entrada
   * 2. Obter contas disponíveis para PJ
   * 3. Calcular tarifa total para cada conta
   * 4. Filtrar contas que atendem aos requisitos
   * 5. Calcular economia em relação à conta atual (se aplicável)
   * 6. Ordenar por menor custo
   * 7. Salvar simulação no banco
   *
   * @param dto - Dados da simulação (Pessoa Jurídica)
   * @returns Lista de contas ordenadas por menor custo
   */
  async simularPessoaJuridica(
    dto: SimularContasDigitaisJuridicaDto,
  ): Promise<ResultadoContasDigitaisDto[]> {
    try {
      this.logger.log('Starting digital accounts simulation (Pessoa Jurídica)');
      this.logger.debug(`Input: ${JSON.stringify(dto)}`);

      // Preparar dados de simulação
      const dadosSimulacao: DadosSimulacaoJuridica = {
        tipoPessoa: TipoPessoa.JURIDICA,
        temConta: dto.temConta,
        tarifa: dto.tarifa || 0,
        saques: dto.saques,
        nDocs: dto.nDocs,
        nTeds: dto.nTeds,
        boletos: dto.boletos,
        maquininha: dto.maquininha,
        folhaPagamento: dto.folhaPagamento,
        debito: dto.debito,
        cartaoVirtual: dto.cartaoVirtual,
      };

      // Obter todas as contas disponíveis
      const todasContas = this.contasDigitaisData.obterTodasContas();
      this.logger.debug(`Total accounts in database: ${todasContas.length}`);

      // Calcular comparação
      const resultados = calcularComparacaoContas(todasContas, dadosSimulacao);

      this.logger.log(
        `Found ${resultados.length} matching accounts for Pessoa Jurídica`,
      );

      if (resultados.length > 0) {
        this.logger.log(
          `Best option: ${resultados[0].nomeBanco} - ${resultados[0].nome} (R$ ${resultados[0].tarifaTotal.toFixed(2)}/month)`,
        );
      }

      // Salvar simulação no banco
      await this.salvarSimulacao(dto, resultados);

      return resultados;
    } catch (error) {
      this.logger.error(
        'Error in digital accounts simulation (PJ)',
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Salva a simulação no banco de dados
   *
   * @param dto - Dados de entrada da simulação
   * @param resultados - Resultados calculados
   */
  private async salvarSimulacao(
    dto: SimularContasDigitaisFisicaDto | SimularContasDigitaisJuridicaDto,
    resultados: ResultadoContasDigitaisDto[],
  ): Promise<void> {
    try {
      const melhorOpcao = resultados[0];

      await this.prisma.simulation.create({
        data: {
          simulatorType: SimulatorType.CONTAS_DIGITAIS,
          nome: dto.nome,
          email: dto.email,
          inputData: {
            tipoPessoa: dto.tipoPessoa,
            temConta: dto.temConta,
            tarifa: dto.tarifa,
            saques: dto.saques,
            nDocs: dto.nDocs,
            nTeds: dto.nTeds,
            debito: dto.debito,
            // Campos específicos de PF
            ...(dto.tipoPessoa === TipoPessoa.FISICA && {
              nDepositos: (dto as SimularContasDigitaisFisicaDto).nDepositos,
              credito: (dto as SimularContasDigitaisFisicaDto).credito,
              investimentos: (dto as SimularContasDigitaisFisicaDto)
                .investimentos,
              transferencias: (dto as SimularContasDigitaisFisicaDto)
                .transferencias,
              depCheque: (dto as SimularContasDigitaisFisicaDto).depCheque,
            }),
            // Campos específicos de PJ
            ...(dto.tipoPessoa === TipoPessoa.JURIDICA && {
              boletos: (dto as SimularContasDigitaisJuridicaDto).boletos,
              maquininha: (dto as SimularContasDigitaisJuridicaDto).maquininha,
              folhaPagamento: (dto as SimularContasDigitaisJuridicaDto)
                .folhaPagamento,
              cartaoVirtual: (dto as SimularContasDigitaisJuridicaDto)
                .cartaoVirtual,
            }),
          },
          outputData: {
            totalContas: resultados.length,
            melhorOpcao: melhorOpcao
              ? {
                  contaId: melhorOpcao.contaId,
                  nome: melhorOpcao.nome,
                  nomeBanco: melhorOpcao.nomeBanco,
                  tarifaTotal: melhorOpcao.tarifaTotal,
                  economia: melhorOpcao.economia,
                }
              : null,
            contas: resultados.slice(0, 10).map((r) => ({
              contaId: r.contaId,
              nome: r.nome,
              nomeBanco: r.nomeBanco,
              tarifaTotal: r.tarifaTotal,
              economia: r.economia,
            })),
          },
        },
      });

      this.logger.log(
        `Simulation saved successfully for ${dto.email} (${dto.tipoPessoa})`,
      );
    } catch (error) {
      // Não falhar a simulação se o salvamento falhar
      this.logger.error(
        'Failed to save simulation to database',
        error.stack,
      );
    }
  }
}
