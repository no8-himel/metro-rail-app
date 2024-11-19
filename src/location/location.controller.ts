import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './location.entity';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  createLocation(@Body() locationData: Partial<Location>) {
    return this.locationService.createLocation(locationData);
  }

  @Get(':id')
  getLocation(@Param('id') id: number) {
    return this.locationService.findLocationById(id);
  }

  @Put(':id')
  updateLocation(@Param('id') id: number, @Body() locationData: Partial<Location>) {
    return this.locationService.updateLocation(id, locationData);
  }

  @Delete(':id')
  deleteLocation(@Param('id') id: number) {
    return this.locationService.deleteLocation(id);
  }
}
