import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as QRCode from 'qrcode';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

    async generateOTP(nid: string, phoneNumber: string) {
      // Logic for OTP generation
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      return { otp, message: 'OTP generated successfully' };
    }

    async generateQRCode(userId: number, startStationId: number, endStationId: number) {
      // Define the data to encode in the QR code
      const qrData = `UserID: ${userId}, StartStationID: ${startStationId}, EndStationID: ${endStationId}`;
  
      // Generate the QR code as a data URL
      const qrCode = await QRCode.toDataURL(qrData);
  
      return { qrCode, message: 'QR code generated successfully' };
    }
    
  createUser(userData: Partial<User>) {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  updateUser(id: number, userData: Partial<User>) {
    return this.userRepository.update(id, userData);
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
