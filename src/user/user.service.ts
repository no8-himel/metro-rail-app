import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

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
        // Generate a unique 6-8 digit alphanumeric string for the QR code
        const qrData = this.generateRandomCode(6, 8);
        // Optionally save this code in the database if you want to verify it later
        return { qrCode: qrData, message: 'QR code generated successfully' };
      }
    
      // Helper method to generate a random alphanumeric string
      private generateRandomCode(minLength: number, maxLength: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
        let result = '';
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
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
