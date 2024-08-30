import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLoanDto } from '../common/dto/create-loan.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoanApplication } from '../entities/loan-application.entity';
import { UpdateLoanStatusDto } from '../common/dto/update-loan-status.dto';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(LoanApplication)
    private readonly loanRepository: Repository<LoanApplication>,
  ) {}

  async create(createLoanDto: CreateLoanDto): Promise<LoanApplication> {
    const isEligible = await this.checkLoanEligibility(createLoanDto);

    if (!isEligible) {
      throw new NotFoundException('Loan application does not meet eligibility criteria');
    }

    const loan = this.loanRepository.create(createLoanDto);
    return this.loanRepository.save(loan);
  }

  async checkLoanEligibility(createLoanDto: CreateLoanDto): Promise<boolean> {
    //? Predefined eligibility criteria
    const minLoanValue = 10000;
    const maxLoanValue = 500000;
    const minCreditScore = 600;
    const maxDebtToIncomeRatio = 0.5;

    //? Check loan value
    if (
      createLoanDto.loanAmount < minLoanValue ||
      createLoanDto.loanAmount > maxLoanValue
    ) {
      return false;
    }

    //? Check credit score
    if (createLoanDto.creditScore < minCreditScore) {
      return false;
    }

    //? Check debt-to-income ratio
    if (createLoanDto.debtToIncomeRatio > maxDebtToIncomeRatio) {
      return false;
    }

    //? If all criteria are met, return true
    return true;
  }

  async findOne(id: number): Promise<LoanApplication> {
    const loan = await this.loanRepository.findOne({ where: { id } });

    if (!loan) {
      throw new NotFoundException(`Loan Application with ID ${id} not found`);
    }

    return loan;
  }

  async updateStatus(
    id: number,
    updateLoanDto: UpdateLoanStatusDto,
  ): Promise<LoanApplication> {
    const loan = await this.loanRepository.findOne({ where: { id } });

    if (!loan) {
      throw new NotFoundException(`Loan Application with ID ${id} not found`);
    }

    loan.status = updateLoanDto.status;
    return this.loanRepository.save(loan);
  }
}
