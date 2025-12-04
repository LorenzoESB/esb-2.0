import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FinanciamentoImovelService } from './financiamento-imovel.service';
import { SimularFinanciamentoImovelDto } from './dto/simular-financiamento-imovel.dto';
import { ResultadoFinanciamentoImovelDto } from './dto/resultado-financiamento-imovel.dto';

/**
 * Controller para simulação de financiamento imobiliário
 *
 * Thin controller - apenas gerencia requisições HTTP
 * Toda lógica de negócio está no FinanciamentoImovelService
 */
@ApiTags('Simuladores')
@Controller('simuladores/financiamento-imovel')
export class FinanciamentoImovelController {
  constructor(
    private readonly financiamentoImovelService: FinanciamentoImovelService,
  ) {}

  /**
   * Simula financiamento imobiliário usando sistema SAC
   *
   * Retorna ofertas de diferentes bancos ordenadas pela menor primeira parcela
   * Utiliza taxas TR-indexed do Banco Central do Brasil
   *
   * @param dto - Dados da simulação (valor imóvel, entrada, prazo, renda)
   * @returns Lista de ofertas de financiamento ordenadas
   */
  @Post('/simular')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Simula financiamento imobiliário',
    description:
      'Calcula ofertas de financiamento imobiliário usando sistema SAC (Sistema de Amortização Constante) com taxas indexadas à TR. Retorna ofertas de múltiplos bancos ordenadas pela menor primeira parcela.',
  })
  @ApiResponse({
    status: 200,
    description: 'Simulação realizada com sucesso',
    type: [ResultadoFinanciamentoImovelDto],
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
    @Body() dto: SimularFinanciamentoImovelDto,
  ): Promise<ResultadoFinanciamentoImovelDto[]> {
    return this.financiamentoImovelService.simular(dto);
  }
}
