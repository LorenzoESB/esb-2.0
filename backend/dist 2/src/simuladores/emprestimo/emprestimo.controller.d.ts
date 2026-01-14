import { EmprestimoService } from './emprestimo.service';
import { SimularEmprestimoDto } from './dto/simular-emprestimo.dto';
import { ResultadoEmprestimoDto } from './dto/resultado-emprestimo.dto';
export declare class EmprestimoController {
    private readonly emprestimoService;
    private readonly logger;
    constructor(emprestimoService: EmprestimoService);
    simular(dto: SimularEmprestimoDto): Promise<ResultadoEmprestimoDto>;
}
