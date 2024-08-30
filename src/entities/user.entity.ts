import { LoanApplication } from './loan-application.entity.js';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  username: string;

  @Column({ length: 20 })
  password: string;

  
  @OneToMany(() => LoanApplication, (loanApplication) => loanApplication.user, {
    cascade: true,
  })

  loanApplications: LoanApplication[];
}
