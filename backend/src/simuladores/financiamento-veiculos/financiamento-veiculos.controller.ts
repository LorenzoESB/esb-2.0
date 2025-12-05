import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FinanciamentoVeiculosService } from './financiamento-veiculos.service';
import { SimularFinanciamentoVeiculosDto } from './dto/simular-financiamento-veiculos.dto';
import { ResultadoFinanciamentoVeiculosDto } from './dto/resultado-financiamento-veiculos.dto';

/**
 * Controller para simulação de financiamento de veículos
 *
 * Thin controller - apenas gerencia requisições HTTP
 * Toda lógica de negócio está no FinanciamentoVeiculosService
 */
@ApiTags('Simuladores')
@Controller('/simuladores/financiamento-veiculos')
export class FinanciamentoVeiculosController {
  constructor(
    private readonly financiamentoVeiculosService: FinanciamentoVeiculosService,
  ) {}

  /**
   * Simula financiamento de veículos usando sistema PRICE
   *
   * Retorna ofertas de diferentes bancos ordenadas pela menor parcela mensal
   * Utiliza taxas do Banco Central do Brasil
   *
   * @param dto - Dados da simulação (valor veículo, entrada, prazo, renda, tipo)
   * @returns Lista de ofertas de financiamento ordenadas
   */
  @Post('/simular')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Simula financiamento de veículos',
    description:
      'Calcula ofertas de financiamento de veículos usando sistema PRICE (Sistema Francês - parcelas fixas). Inclui cálculo de IOF. Retorna ofertas de múltiplos bancos ordenadas pela menor parcela mensal.',
  })
  @ApiResponse({
    status: 200,
    description: 'Simulação realizada com sucesso',
    type: [ResultadoFinanciamentoVeiculosDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno ao processar simulação',
  })
  async simular(
    @Body() dto: SimularFinanciamentoVeiculosDto,
  ): Promise<ResultadoFinanciamentoVeiculosDto[]> {
    return this.financiamentoVeiculosService.simular(dto);
  }
}
