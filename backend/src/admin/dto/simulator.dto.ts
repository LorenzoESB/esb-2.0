import { IsBoolean, IsOptional, IsString, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSimulatorDto {
  @ApiPropertyOptional({ description: 'Simulator title' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Simulator description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Simulator category' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ description: 'Is active status' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Configuration parameters' })
  @IsObject()
  @IsOptional()
  configuration?: Record<string, any>;
}
