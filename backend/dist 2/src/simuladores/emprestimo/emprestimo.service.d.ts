import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SimulatorMetadataService } from '../metadata/simulator-metadata.service';
import { ISimulatorStrategy } from '../interfaces/simulator-strategy.interface';
import { SimulatorRegistry } from '../registry/simulator.registry';
import { SimularEmprestimoDto } from './dto/simular-emprestimo.dto';
import { ResultadoEmprestimoDto } from './dto/resultado-emprestimo.dto';
import { EmailService } from '../../email/email.service';
export declare class EmprestimoService implements ISimulatorStrategy, OnModuleInit {
    private readonly prisma;
    private readonly metadataService;
    private readonly registry;
    private readonly emailService;
    private readonly logger;
    constructor(prisma: PrismaService, metadataService: SimulatorMetadataService, registry: SimulatorRegistry, emailService: EmailService);
    onModuleInit(): void;
    getSimulatorType(): string;
    execute(input: any, metadata?: any): Promise<any>;
    simular(dto: SimularEmprestimoDto, metadata?: any): Promise<ResultadoEmprestimoDto>;
    private buscarTaxasDisponiveis;
    private calcularOfertas;
    private salvarSimulacao;
}
