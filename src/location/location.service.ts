import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  createLocation(locationData: Partial<Location>) {
    const location = this.locationRepository.create(locationData);
    return this.locationRepository.save(location);
  }

  findLocationById(id: number) {
    return this.locationRepository.findOne({ where: { id } });
  }

  updateLocation(id: number, locationData: Partial<Location>) {
    return this.locationRepository.update(id, locationData);
  }

  deleteLocation(id: number) {
    return this.locationRepository.delete(id);
  }
}
