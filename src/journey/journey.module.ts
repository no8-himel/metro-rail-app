import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JourneyService } from './journey.service';
import { JourneyController } from './journey.controller';
import { Journey } from './journey.entity';
import { Location } from '../location/location.entity'; // If LocationRepository is used in JourneyService

@Module({
  imports: [TypeOrmModule.forFeature([Journey, Location])], // Importing Journey and any other required entities
  providers: [JourneyService],
  controllers: [JourneyController],
  exports: [TypeOrmModule], // Exporting TypeOrmModule if the repository is needed in other modules
})
export class JourneyModule {}
