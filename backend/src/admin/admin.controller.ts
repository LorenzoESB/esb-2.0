import { Controller, Get, Post, Put, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { LoginDto, LoginResponseDto } from './dto/auth.dto';
import { UpdateSimulatorDto } from './dto/simulator.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('auth/login')
  @ApiOperation({ summary: 'Admin login' })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  async login(@Body() loginDto: LoginDto) {
    return this.adminService.login(loginDto);
  }

  @Get('simulators')
  @ApiOperation({ summary: 'List all simulators' })
  async getSimulators() {
    return this.adminService.getSimulators();
  }

  @Get('rankings')
  @ApiOperation({ summary: 'List all rankings' })
  async getRankings() {
    return this.adminService.getRankings();
  }

  @Get('simulators/:id')
  @ApiOperation({ summary: 'Get simulator details' })
  async getSimulator(@Param('id') id: string) {
    return this.adminService.getSimulator(id);
  }

  @Put('simulators/:id')
  @ApiOperation({ summary: 'Update simulator metadata' })
  async updateSimulator(@Param('id') id: string, @Body() updateDto: UpdateSimulatorDto) {
    return this.adminService.updateSimulator(id, updateDto);
  }

  @Get('analytics/overview')
  @ApiOperation({ summary: 'Get analytics overview' })
  async getAnalyticsOverview() {
    return this.adminService.getAnalyticsOverview();
  }

  @Get('data-health')
  @ApiOperation({ summary: 'Get data integrity and health status' })
  async getDataHealth() {
    return this.adminService.getDataHealth();
  }
  
  // Helper endpoint to init data (dev only)
  @Post('init')
  async initData() {
    await this.adminService.createInitialAdminIfNeeded();
    return { message: 'Initialization check complete' };
  }
}
