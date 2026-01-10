import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SimulatorMetadataService } from './simulator-metadata.service';
import { StrapiModule } from '../../../integrations/strapi/strapi.module';

@Module({
  imports: [ConfigModule, StrapiModule],
  providers: [SimulatorMetadataService],
  exports: [SimulatorMetadataService],
})
export class SimulatorMetadataModule {}
