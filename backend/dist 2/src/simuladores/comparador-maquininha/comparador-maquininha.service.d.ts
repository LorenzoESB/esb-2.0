import { PrismaService } from '../../prisma/prisma.service';
import { CompararMaquininhaDto } from './dto/comparar-maquininha.dto';
import { ResultadoComparacaoDto } from './dto/resultado-comparacao.dto';
import { ListaMaquininhasDto } from './dto/maquininha-opcao.dto';
import { EmailService } from '../../email/email.service';
export declare class ComparadorMaquininhaService {
    private readonly prisma;
    private readonly emailService;
    private readonly logger;
    constructor(prisma: PrismaService, emailService: EmailService);
    listarMaquinhasDisponiveis(): Promise<ListaMaquininhasDto>;
    comparar(dto: CompararMaquininhaDto): Promise<ResultadoComparacaoDto>;
    private formatarPercentual;
    private salvarComparacao;
}
