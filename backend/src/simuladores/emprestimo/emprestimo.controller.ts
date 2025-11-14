import { Controller } from '@nestjs/common';
import { EmprestimoService } from './emprestimo.service';

@Controller('emprestimos')
export class EmprestimoController {
  constructor(private readonly emprestimoService: EmprestimoService) { }
}
