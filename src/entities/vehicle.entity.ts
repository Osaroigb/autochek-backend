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

  @Column()
  vin: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @OneToOne(() => Valuation, (valuation) => valuation.vehicle)
  @JoinColumn()
  valuation: Valuation;

  @OneToMany(() => LoanApplication, (loanApplication) => loanApplication.user)
  loanApplications: LoanApplication[];
}
