import { Vehicle } from './vehicle.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class Valuation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  loanValue: number;

  @Column('decimal', { precision: 10, scale: 2 })
  tradeInValue: number;

  @Column('decimal', { precision: 10, scale: 2 })
  adjustedTradeInValue: number;

  @Column({ length: 50 })
  make: string;

  @Column({ length: 50 })
  makeCode: string;

  @Column({ length: 50 })
  model: string;

  @Column({ length: 50 })
  modelCode: string;

  @Column({ length: 100 })
  trim: string;

  @Column({ length: 50 })
  trimCode: string;

  @Column()
  year: number;

  @Column()
  retailValue: number;

  @Column()
  msrpValue: number;

  @Column()
  averageTradeIn: number;

  @Column()
  weight: number;

  @Column()
  mileageAdjustment: number;

  @Column({ length: 50 })
  uid: string;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.valuation)
  vehicle: Vehicle;
}
