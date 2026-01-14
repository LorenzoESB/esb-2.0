import { JurosCompostosInputDto } from './dto/juros-compostos-input.dto';
import { JurosCompostosDetalhadoOutputDto } from './dto/juros-compostos-output.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../../email/email.service';
export declare class JurosCompostosService {
    private readonly prisma;
    private readonly emailService;
    private readonly logger;
    constructor(prisma: PrismaService, emailService: EmailService);
    private readonly aliquotasIR;
    calculaJurosCompostos(input: JurosCompostosInputDto): Promise<JurosCompostosDetalhadoOutputDto>;
    private salvarSimulacao;
    private getAliquotaIR;
    private converterParaDias;
    private calcularPeriodoMeses;
    private calcularJurosCompostosMesAMes;
    private formatarValor;
}
