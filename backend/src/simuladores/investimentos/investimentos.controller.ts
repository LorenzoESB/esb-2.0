import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InvestimentosService } from './investimentos.service';

@Controller('investimentoss')
export class InvestimentosController {
  constructor(private readonly investimentosService: InvestimentosService) {}
}
