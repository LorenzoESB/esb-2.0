import { PrismaService } from '../../prisma/prisma.service';
import { SimularContasDigitaisFisicaDto, SimularContasDigitaisJuridicaDto } from './dto/simular-contas-digitais.dto';
import { ResultadoContasDigitaisDto } from './dto/resultado-contas-digitais.dto';
import { ContasDigitaisData } from './data/contas-digitais.data';
import { EmailService } from '../../email/email.service';
export declare class ContasDigitaisService {
    private readonly prisma;
    private readonly contasDigitaisData;
    private readonly emailService;
    private readonly logger;
    constructor(prisma: PrismaService, contasDigitaisData: ContasDigitaisData, emailService: EmailService);
    simularPessoaFisica(dto: SimularContasDigitaisFisicaDto): Promise<ResultadoContasDigitaisDto[]>;
    simularPessoaJuridica(dto: SimularContasDigitaisJuridicaDto): Promise<ResultadoContasDigitaisDto[]>;
    private salvarSimulacao;
}
