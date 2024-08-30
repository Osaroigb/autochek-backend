import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Valuation } from './valuation.entity';
import { LoanApplication } from './loan-application.entity';

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

  @OneToOne(() => Valuation, (valuation) => valuation.vehicle, { nullable: true })
  @JoinColumn()
  valuation: Valuation;

  @OneToMany(() => LoanApplication, (loanApplication) => loanApplication.vehicle)
  loanApplications: LoanApplication[];
}
