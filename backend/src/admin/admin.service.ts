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
      orderBy: { createdAt: 'desc' },
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
