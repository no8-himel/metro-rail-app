import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../location/location.entity';
import { AdminSettings } from './admin-settings.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,

    @InjectRepository(AdminSettings)
    private adminSettingsRepository: Repository<AdminSettings>,
  ) {}

  // Function to update the fare for a station
  async updateFare(stationId: number, newFare: number) {
    const result = await this.locationRepository.update(stationId, { incrementalFare: newFare });
    if (result.affected === 0) {
      throw new Error('Station not found');
    }
    return { message: 'Fare updated successfully' };
  }

  // Function to update station availability
  async updateStationAvailability(stationId: number, availability: boolean) {
    const result = await this.locationRepository.update(stationId, { isAvailable: availability });
    if (result.affected === 0) {
      throw new Error('Station not found');
    }
    return { message: 'Station availability updated successfully' };
  }

  // Function to update service timings
  async updateServiceTimings(newStartTime: string, newEndTime: string) {
    const existingSettings = await this.adminSettingsRepository.findOne({ where: { id: 1 } });
    if (existingSettings) {
      existingSettings.serviceStartTime = newStartTime;
      existingSettings.serviceEndTime = newEndTime;
      await this.adminSettingsRepository.save(existingSettings);
      return { message: 'Service timings updated successfully' };
    } else {
      const newSettings = this.adminSettingsRepository.create({
        serviceStartTime: newStartTime,
        serviceEndTime: newEndTime,
        trainStatus: 'active', // default status
      });
      await this.adminSettingsRepository.save(newSettings);
      return { message: 'Service timings created successfully' };
    }
  }

  // Function to update train status
  async updateTrainStatus(id: number, status: string) {
    const existingSettings = await this.adminSettingsRepository.findOne({ where: { id: 1 } });
    if (existingSettings) {
      existingSettings.trainStatus = status;
      await this.adminSettingsRepository.save(existingSettings);
      return { message: `Train status updated to ${status}` };
    } else {
      const newSettings = this.adminSettingsRepository.create({
        serviceStartTime: '00:00',
        serviceEndTime: '23:59',
        trainStatus: status,
      });
      await this.adminSettingsRepository.save(newSettings);
      return { message: `Train status created and set to ${status}` };
    }
  }
}
