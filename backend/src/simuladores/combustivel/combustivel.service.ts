import { Injectable, Logger } from '@nestjs/common';
import { CombustivelInputDto } from './dto/combustivel-input.dto';
import { CombustivelOutputDto } from './dto/combustivel-output.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CombustivelService {
  private readonly logger = new Logger(CombustivelService.name);

  constructor(private readonly prisma: PrismaService) {}

  calcular(input: CombustivelInputDto): CombustivelOutputDto {

    const resultado = calcularCombustivelVantajoso({
      precoGasolina: input.precoGasolina,
      precoEtanol: input.precoEtanol,
      consumoGasolina: input.consumoGasolina,
      consumoEtanol: input.consumoEtanol,
    });

    return {
      recomendacao: resultado.recomendacao,
      custos: {
        gasolina: {
          custoPorKm: resultado.custos.gasolina,
          custoFormatado: formatarMoeda(resultado.custos.gasolina),
        },
        etanol: {
          custoPorKm: resultado.custos.etanol,
          custoFormatado: formatarMoeda(resultado.custos.etanol),
        },
      },
      economia: {
        valor: resultado.economia.valor,
        valorFormatado: formatarMoeda(resultado.economia.valor),
        percentual: resultado.economia.percentual,
      },
      mensagem: gerarMensagem(input, resultado.recomendacao),
    };
  }


}