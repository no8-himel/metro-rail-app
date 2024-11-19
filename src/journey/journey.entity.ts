import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Journey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ length: 8 }) // Length adjusted for the 6-8 digit alphanumeric code
  qrCode: string;

  @Column({ type: 'timestamp', nullable: true })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date;

  @Column({ type: 'int', nullable: true })
  totalMinutesTraveled: number;

  @ManyToOne(() => User, (user) => user.journeys)
  user: User;
}
