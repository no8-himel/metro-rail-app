import { Controller, Put, Param, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Route to update the fare for a specific station
  @Put('update-fare/:id')
  async updateFare(@Param('id') id: number, @Body('newFare') newFare: number) {
    return this.adminService.updateFare(id, newFare);
  }

  // Route to update station availability
  @Put('update-availability/:id')
  async updateAvailability(@Param('id') id: number, @Body('availability') availability: boolean) {
    return this.adminService.updateStationAvailability(id, availability);
  }

  // Route to update service timings
  @Put('update-service-timings')
  updateServiceTimings(@Body('newStartTime') newStartTime: string, @Body('newEndTime') newEndTime: string) {
    return this.adminService.updateServiceTimings(newStartTime, newEndTime);
  }

  // Route to update train status
  @Put('update-train-status/:id')
  updateTrainStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.adminService.updateTrainStatus(id, status);
  }
}
