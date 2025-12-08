import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContasDigitaisService } from './contas-digitais.service';
import {
  SimularContasDigitaisFisicaDto,
  SimularContasDigitaisJuridicaDto,
} from './dto/simular-contas-digitais.dto';
import { ResultadoContasDigitaisDto } from './dto/resultado-contas-digitais.dto';

/**
 * Controlador de simulação de contas digitais
 *
 * Fornece endpoints para comparar contas digitais brasileiras
 * para Pessoa Física e Pessoa Jurídica
 */
@ApiTags('Simuladores - Contas Digitais')
@Controller('simuladores/contas-digitais')
export class ContasDigitaisController {
  private readonly logger = new Logger(ContasDigitaisController.name);

  constructor(private readonly contasDigitaisService: ContasDigitaisService) {}

  /**
   * Simula comparação de contas digitais para Pessoa Física
   *
   * Endpoint: POST /simuladores/contas-digitais/pessoa-fisica
   *
   * Calcula o custo mensal de diferentes contas digitais com base no
   * perfil de uso do cliente e retorna as opções ordenadas por menor custo.
   *
   * @param dto - Dados de uso e requisitos do cliente (Pessoa Física)
   * @returns Lista de contas digitais ordenadas por menor custo mensal
   */
  @Post('pessoa-fisica')
  @ApiOperation({
    summary: 'Simular contas digitais para Pessoa Física',
    description:
      'Compara contas digitais brasileiras baseado no perfil de uso e requisitos do cliente pessoa física. Retorna lista ordenada por menor custo mensal total.',
  })
  @ApiResponse({
    status: 201,
    description: 'Simulação realizada com sucesso',
    type: [ResultadoContasDigitaisDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos',
  })
  async simularPessoaFisica(
    @Body() dto: SimularContasDigitaisFisicaDto,
  ): Promise<ResultadoContasDigitaisDto[]> {
    this.logger.log(
      `POST /simuladores/contas-digitais/pessoa-fisica - ${dto.email}`,
    );
    return this.contasDigitaisService.simularPessoaFisica(dto);
  }

  /**
   * Simula comparação de contas digitais para Pessoa Jurídica
   *
   * Endpoint: POST /simuladores/contas-digitais/pessoa-juridica
   *
   * Calcula o custo mensal de diferentes contas digitais PJ com base no
   * perfil de uso da empresa e retorna as opções ordenadas por menor custo.
   *
   * @param dto - Dados de uso e requisitos da empresa (Pessoa Jurídica)
   * @returns Lista de contas digitais PJ ordenadas por menor custo mensal
   */
  @Post('pessoa-juridica')
  @ApiOperation({
    summary: 'Simular contas digitais para Pessoa Jurídica',
    description:
      'Compara contas digitais PJ brasileiras baseado no perfil de uso e requisitos da empresa. Retorna lista ordenada por menor custo mensal total.',
  })
  @ApiResponse({
    status: 201,
    description: 'Simulação realizada com sucesso',
    type: [ResultadoContasDigitaisDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos',
  })
  async simularPessoaJuridica(
    @Body() dto: SimularContasDigitaisJuridicaDto,
  ): Promise<ResultadoContasDigitaisDto[]> {
    this.logger.log(
      `POST /simuladores/contas-digitais/pessoa-juridica - ${dto.email}`,
    );
    return this.contasDigitaisService.simularPessoaJuridica(dto);
  }
}
