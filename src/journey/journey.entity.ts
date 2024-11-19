import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Location } from '../location/location.entity';

@Entity()
export class Journey {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  userId: number;

  @ManyToOne(() => Location)
  startStationId: number;

  @ManyToOne(() => Location)
  endStationId: number;

  @Column()
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @Column({ nullable: true })
  totalMinutes: number;

  @Column({ nullable: true })
  totalAmountSpent: number;
}
