import { User } from './user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class LoanApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loanAmount: number;

  @Column('decimal')
  interestRate: number;

  @Column()
  loanTerm: number;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.loanApplications)
  user: User;
}
