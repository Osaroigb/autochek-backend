import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Valuation } from './valuation.entity';
import { LoanApplication } from './loan-application.entity.js';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  vin: string;

  @Column({ length: 25 })
  make: string;

  @Column({ length: 25 })
  model: string;

  @Column('integer')
  year: number;

  @Column('integer')
  mileage: number;

  @OneToOne(() => Valuation, (valuation) => valuation.vehicle)
  @JoinColumn()
  valuation: Valuation;

  @OneToMany(
    () => LoanApplication,
    (loanApplication) => loanApplication.vehicle,
  )
  loanApplications: LoanApplication[];
}
