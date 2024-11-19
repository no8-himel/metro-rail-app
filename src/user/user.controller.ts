import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body('nid') nid: string, @Body('phoneNumber') phoneNumber: string) {
    return this.userService.generateOTP(nid, phoneNumber);
  }

@Post('generate-qr')
    async generateQRCode(
      @Body('userId') userId: number,
      @Body('startStationId') startStationId: number,
      @Body('endStationId') endStationId: number
    ) {
      return this.userService.generateQRCode(userId, startStationId, endStationId);
    }
    
  @Post()
  createUser(@Body() userData: Partial<User>) {
    return this.userService.createUser(userData);
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() userData: Partial<User>) {
    return this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
