import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { LoanApplication } from '../entities/loan-application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoanApplication])],
  providers: [LoansService],
  controllers: [LoansController],
})

export class LoansModule {}
