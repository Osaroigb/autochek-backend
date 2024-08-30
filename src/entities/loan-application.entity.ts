import { User } from './user.entity';
import { Vehicle } from './vehicle.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

export enum LoanStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity()
export class LoanApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer')
  loanAmount: number;

  @Column('decimal', { precision: 5, scale: 2 })
  interestRate: number;

  @Column('integer')
  loanTerm: number;

  @Column('integer')
  creditScore: number;

  @Column('decimal')
  debtToIncomeRatio: number;

  @Column({ length: 10 })
  status: string;

  @ManyToOne(() => User, (user) => user.loanApplications)
  user: User;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.loanApplications)
  vehicle: Vehicle;
}
