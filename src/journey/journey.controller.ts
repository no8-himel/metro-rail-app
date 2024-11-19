import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { JourneyService } from './journey.service';

@Controller('journey')
export class JourneyController {
  constructor(private readonly journeyService: JourneyService) {}

  @Post('start')
  async startJourney(@Body() journeyData: { userId: number, qrCode: string }) {
    return this.journeyService.startJourney(journeyData.userId, journeyData.qrCode);
  }

  @Post('end')
  async endJourney(@Body() journeyData: { userId: number, qrCode: string }) {
    return this.journeyService.endJourney(journeyData.userId, journeyData.qrCode);
  }

  // Endpoint to get all activity logs of a specific user
  @Get('user/:id')
  async getUserActivityLog(@Param('id') userId: number) {
    return this.journeyService.getUserActivityLog(userId);
  }

  // Endpoint to get the monthly summary of a specific user
  @Get('summary/:id')
  async getMonthlySummary(@Param('id') userId: number) {
    return this.journeyService.getMonthlySummary(userId);
  }

  @Get(':id')
  async getJourneyById(@Param('id') id: number) {
    return this.journeyService.getJourneyById(id);
  }

  @Put(':id')
  async updateJourney(@Param('id') id: number, @Body() journeyData: any) {
    return this.journeyService.updateJourney(id, journeyData);
  }

  @Delete(':id')
  async deleteJourney(@Param('id') id: number) {
    return this.journeyService.deleteJourney(id);
  }
}
