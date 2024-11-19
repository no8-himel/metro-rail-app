import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Journey } from './journey.entity';
import { Location } from '../location/location.entity';

@Injectable()
export class JourneyService {
  constructor(
    @InjectRepository(Journey)
    private journeyRepository: Repository<Journey>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async startJourney(journeyData: Partial<Journey>) {
    const startStation = await this.locationRepository.findOne({ where: { id: journeyData.startStationId } });
    const endStation = await this.locationRepository.findOne({ where: { id: journeyData.endStationId } });    

    if (!startStation || !endStation) {
      throw new Error('Invalid station selection');
    }

    const fare = Math.abs(endStation.incrementalFare - startStation.incrementalFare);
    const newJourney = this.journeyRepository.create({
      ...journeyData,
      totalAmountSpent: fare,
    });

    return this.journeyRepository.save(newJourney);
  }

  getJourneyById(id: number) {
    return this.journeyRepository.findOne({ where: { id } });
  }

  updateJourney(id: number, journeyData: Partial<Journey>) {
    return this.journeyRepository.update(id, journeyData);
  }

  deleteJourney(id: number) {
    return this.journeyRepository.delete(id);
  }
}
