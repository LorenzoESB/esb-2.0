import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, LoginResponseDto } from './dto/auth.dto';
import { UpdateSimulatorDto } from './dto/simulator.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;
    
    // Find user by email
    const user = await this.prisma.adminUser.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // TODO: Implement proper password hashing verification (e.g. bcrypt)
    // For now, we assume simple comparison or that passwordHash is the password itself in dev
    if (user.passwordHash !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive');
    }

    // Update last login
    await this.prisma.adminUser.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    return {
      accessToken: 'mock-jwt-token-' + user.id, // Replace with real JWT generation
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async getSimulators() {
    return this.prisma.simulatorMetadata.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getRankings() {
    return this.prisma.rankingMetadata.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getSimulator(id: string) {
    return this.prisma.simulatorMetadata.findUnique({
      where: { id },
    });
  }

  async updateSimulator(id: string, updateDto: UpdateSimulatorDto) {
    const simulator = await this.prisma.simulatorMetadata.findUnique({
      where: { id },
    });

    if (!simulator) {
      throw new NotFoundException('Simulator not found');
    }

    return this.prisma.simulatorMetadata.update({
      where: { id },
      data: updateDto,
    });
  }

  async getAnalyticsOverview() {
    // Mock analytics data for now
    return {
      pageViews: { total: 12500, trend: '+15%' },
      userSessions: { total: 3200, trend: '+5%' },
      topContent: [
        { title: 'Melhor Maquininha', views: 5000 },
        { title: 'Simulador de Renda Fixa', views: 3500 },
      ],
      dropOffPoints: [
        { page: '/checkout', rate: '45%' },
      ],
    };
  }

  async getDataHealth() {
    const issues: { severity: 'error' | 'warning' | 'info'; message: string; details?: string }[] = [];
    
    // Check 1: Simulators without description
    const simulatorsWithoutDesc = await this.prisma.simulatorMetadata.findMany({
      where: { 
        OR: [
          { description: null },
          { description: '' }
        ]
      }
    });

    if (simulatorsWithoutDesc.length > 0) {
      issues.push({
        severity: 'warning',
        message: `${simulatorsWithoutDesc.length} simulators are missing a description`,
        details: simulatorsWithoutDesc.map(s => s.title || s.simulatorId).join(', ')
      });
    }

    // Check 2: Active simulators with no category
    const activeNoCategory = await this.prisma.simulatorMetadata.findMany({
      where: {
        isActive: true,
        OR: [
          { category: null },
          { category: '' }
        ]
      }
    });

    if (activeNoCategory.length > 0) {
      issues.push({
        severity: 'error',
        message: `${activeNoCategory.length} active simulators have no category assigned`,
        details: activeNoCategory.map(s => s.title || s.simulatorId).join(', ')
      });
    }

    // Mock Check 3: Legacy data dependencies
    issues.push({
      severity: 'info',
      message: '3 rankings are still pulling data from legacy MySQL database',
      details: 'Renda Fixa, Conta Digital, Empréstimo Pessoal'
    });

    return {
      status: issues.some(i => i.severity === 'error') ? 'unhealthy' : (issues.length > 0 ? 'warning' : 'healthy'),
      issues
    };
  }

  async createInitialAdminIfNeeded() {
    const adminEmail = 'admin@educandoseubolso.blog.br';
    const exists = await this.prisma.adminUser.findUnique({
      where: { email: adminEmail },
    });

    if (!exists) {
      await this.prisma.adminUser.create({
        data: {
          email: adminEmail,
          passwordHash: 'admin123', // Default password
          name: 'Super Admin',
          role: 'admin',
        },
      });
      console.log('Initial admin user created');
    }
  }
}
