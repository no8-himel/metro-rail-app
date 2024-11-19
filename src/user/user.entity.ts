import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nid: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ default: false })
  isVerified: boolean;
  journeys: any;
  name: any;
}
