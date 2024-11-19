import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { Location } from './location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationService],
  controllers: [LocationController],
  exports: [TypeOrmModule], // Export TypeOrmModule if needed in other modules
})
export class LocationModule {}
