import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AmortizacaoService } from './amortizacao.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Compound Interest')
@Controller('amortizacaos')
export class AmortizacaoController {
  constructor(private readonly amortizacaoService: AmortizacaoService) {}
}
