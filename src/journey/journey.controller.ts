import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { JourneyService } from './journey.service';
import { Journey } from './journey.entity';

@Controller('journey')
export class JourneyController {
  constructor(private readonly journeyService: JourneyService) {}

  @Post()
  startJourney(@Body() journeyData: Partial<Journey>) {
    return this.journeyService.startJourney(journeyData);
  }

  @Get(':id')
  getJourney(@Param('id') id: number) {
    return this.journeyService.getJourneyById(id);
  }

  @Put(':id')
  updateJourney(@Param('id') id: number, @Body() journeyData: Partial<Journey>) {
    return this.journeyService.updateJourney(id, journeyData);
  }

  @Delete(':id')
  deleteJourney(@Param('id') id: number) {
    return this.journeyService.deleteJourney(id);
  }
}
