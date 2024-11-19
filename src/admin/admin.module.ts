import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminSettings } from './admin-settings.entity';
import { Location } from '../location/location.entity'; // If needed in AdminService

@Module({
  imports: [TypeOrmModule.forFeature([AdminSettings, Location])], // Importing AdminSettings and any other needed entities
  providers: [AdminService],
  controllers: [AdminController],
  exports: [TypeOrmModule], // Export TypeOrmModule if needed by other modules
})
export class AdminModule {}
