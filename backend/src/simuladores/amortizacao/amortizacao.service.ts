import { Injectable, Logger } from '@nestjs/common';
import { AmortizacaoOutputDto } from './dto/amortizacao-output.dto';
import { AmortizacaoInputDto } from './dto/amortizacao-input.dto';

@Injectable()
export class AmortizacaoService {
  private readonly logger = new Logger(AmortizacaoService.name);

  async calculaAmortizacao(
    input: AmortizacaoInputDto,
  ): Promise<AmortizacaoOutputDto> {
    this.logger.debug('Calculating amortization', { input });

    const result: AmortizacaoOutputDto = {};

    return result;
  }
}
