import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoreThanOrEqual } from 'typeorm';
import { Journey } from './journey.entity';
import { User } from '../user/user.entity';

@Injectable()
export class JourneyService {
  getJourneyById(id: number) {
    throw new Error('Method not implemented.');
  }
  updateJourney(id: number, journeyData: any) {
    throw new Error('Method not implemented.');
  }
  deleteJourney(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Journey)
    private journeyRepository: Repository<Journey>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async startJourney(userId: number, qrCode: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const journey = this.journeyRepository.create({
      userId,
      qrCode,
      startTime: new Date(),
    });

    await this.journeyRepository.save(journey);
    return { message: 'Journey started', startTime: journey.startTime };
  }

  async endJourney(userId: number, qrCode: string): Promise<any> {
    const journey = await this.journeyRepository.findOne({
      where: { userId, qrCode, endTime: null },
    });

    if (!journey) {
      throw new NotFoundException('No ongoing journey found with the provided QR code');
    }

    journey.endTime = new Date();
    journey.totalMinutesTraveled = Math.floor((journey.endTime.getTime() - journey.startTime.getTime()) / 60000);
    await this.journeyRepository.save(journey);

    return {
      message: 'Journey ended',
      endTime: journey.endTime,
      totalMinutesTraveled: journey.totalMinutesTraveled,
    };
  }

  async getUserActivityLog(userId: number): Promise<any> {
    const journeys = await this.journeyRepository.find({ where: { userId } });

    if (journeys.length === 0) {
      throw new NotFoundException('No journeys found for the specified user');
    }

    return journeys.map((journey) => ({
      userId: journey.userId,
      startTime: journey.startTime,
      endTime: journey.endTime,
      totalMinutesTraveled: journey.totalMinutesTraveled,
    }));
  }

  async getMonthlySummary(userId: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const currentMonthStart = new Date();
    currentMonthStart.setDate(1);
    currentMonthStart.setHours(0, 0, 0, 0);
  
    const journeys = await this.journeyRepository.find({
      where: {
        userId,
        startTime: MoreThanOrEqual(currentMonthStart),
      },
    });
  
    const totalMinutesTraveled = journeys.reduce((acc, journey) => acc + (journey.totalMinutesTraveled || 0), 0);
    const totalDistanceTraveled = journeys.length * 10; // Assume 10 units distance per journey for example
    const totalAmountSpent = journeys.length * 50; // Assume 50 BDT per journey for example
  
    return {
      username: user.name,
      totalMinutesTraveled,
      totalDistanceTraveled,
      numberOfJourneys: journeys.length,
      totalAmountSpent,
    };
  } }
