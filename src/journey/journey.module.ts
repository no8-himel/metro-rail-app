import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JourneyService } from './journey.service';
import { JourneyController } from './journey.controller';
import { Journey } from './journey.entity';
import { UserModule } from '../user/user.module'; // Import UserModule

@Module({
  imports: [TypeOrmModule.forFeature([Journey]), UserModule], // Add UserModule here
  providers: [JourneyService],
  controllers: [JourneyController],
})
export class JourneyModule {}
