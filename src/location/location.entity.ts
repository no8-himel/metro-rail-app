import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  stationName: string;

  @Column()
  incrementalFare: number;

  @Column({ default: true })
  isAvailable: boolean;
}
