import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AdminSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceStartTime: string;

  @Column()
  serviceEndTime: string;

  @Column()
  trainStatus: string;
}
