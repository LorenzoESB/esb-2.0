import { JurosCompostosService } from './juros-compostos.service';
import { JurosCompostosInputDto } from './dto/juros-compostos-input.dto';
import { JurosCompostosDetalhadoOutputDto } from './dto/juros-compostos-output.dto';
export declare class JurosCompostosController {
    private readonly jurosCompostosService;
    private readonly logger;
    constructor(jurosCompostosService: JurosCompostosService);
    calculaJurosCompostos(input: JurosCompostosInputDto): Promise<{
        message: string;
        data: JurosCompostosDetalhadoOutputDto;
    }>;
}
