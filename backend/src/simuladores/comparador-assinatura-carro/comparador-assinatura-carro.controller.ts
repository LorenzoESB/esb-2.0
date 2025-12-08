import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ComparadorAssinaturaCarroService } from './comparador-assinatura-carro.service';
import { SimularComparadorDto } from './dto/simular-comparador.dto';
import { ResultadoComparadorDto } from './dto/resultado-comparador.dto';

/**
 * Controller para comparador de assinatura de carros
 *
 * Thin controller - apenas gerencia requisições HTTP
 * Toda lógica de negócio está no ComparadorAssinaturaCarroService
 */
@ApiTags('Simuladores')
@Controller('/simuladores/comparador-assinatura-carro')
export class ComparadorAssinaturaCarroController {
  constructor(
    private readonly comparadorService: ComparadorAssinaturaCarroService,
  ) {}

  /**
   * Compara três cenários de aquisição de veículo
   *
   * Retorna análise comparativa entre:
   * 1. Compra à vista
   * 2. Financiamento
   * 3. Assinatura de veículo
   *
   * @param dto - Dados da simulação de comparação
   * @returns Resultado da comparação com breakdown de custos
   */
  @Post('/simular')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Compara compra, financiamento e assinatura de veículos',
    description:
      'Realiza análise comparativa de custos entre comprar à vista, financiar ou assinar um veículo. Inclui todos os custos de propriedade (manutenção, IPVA, seguro, depreciação, custo de oportunidade). Determina a melhor opção financeira baseada no período especificado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Comparação realizada com sucesso',
    type: ResultadoComparadorDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos fornecidos',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno ao processar comparação',
  })
  async simular(
    @Body() dto: SimularComparadorDto,
  ): Promise<ResultadoComparadorDto> {
    return this.comparadorService.simular(dto);
  }
}
