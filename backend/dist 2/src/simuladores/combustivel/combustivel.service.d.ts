import { CombustivelInputDto } from './dto/combustivel-input.dto';
import { CombustivelOutputDto } from './dto/combustivel-output.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from '../../email/email.service';
export declare class CombustivelService {
    private readonly prisma;
    private readonly emailService;
    private readonly logger;
    constructor(prisma: PrismaService, emailService: EmailService);
    private arredondar;
    private calcularCustoPorKm;
    private calcularEconomia;
    private formatarMoeda;
    private gerarMensagem;
    private calcularCombustivelVantajoso;
    comparaCombustivelEtanol(input: CombustivelInputDto): Promise<CombustivelOutputDto>;
    salvaSimulacao(input: CombustivelInputDto, output: CombustivelOutputDto): Promise<void>;
}
