import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLoanDto } from '../dto/create-loan.dto';
import { UpdateLoanStatusDto } from '../dto/update-loan-status.dto';
import { LoanApplication, LoanStatus } from '../entities/loan-application.entity.js';
import { Injectable, NotFoundException, Logger, BadRequestException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class LoansService {
  private readonly logger = new Logger(LoansService.name);

  constructor(
    @InjectRepository(LoanApplication)
    private readonly loanRepository: Repository<LoanApplication>,
  ) {}

  async create(createLoanDto: CreateLoanDto): Promise<LoanApplication> {
    const isEligible = await this.checkLoanEligibility(createLoanDto);

    if (!isEligible) {
      this.logger.error('Loan application does not meet eligibility criteria');

      throw new ForbiddenException(
        'Loan application does not meet eligibility criteria',
      );
    }

    //? Set default status to "pending"
    createLoanDto.status = LoanStatus.PENDING;

    const loan = this.loanRepository.create(createLoanDto);
    return this.loanRepository.save(loan);
  }

  async checkLoanEligibility(createLoanDto: CreateLoanDto): Promise<boolean> {
    //? Predefined eligibility criteria
    const minLoanValue = 10000;
    const maxLoanValue = 500000;
    const minCreditScore = 600;
    const maxDebtToIncomeRatio = 0.5;

    this.logger.log('Checking loan eligibility....');

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
      this.logger.error(`Loan Application with ID ${id} not found`);
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
      this.logger.error(`Loan Application with ID ${id} not found`);
      throw new NotFoundException(`Loan Application with ID ${id} not found`);
    }

    if (!['APPROVED', 'REJECTED'].includes(updateLoanDto.status)) {
      this.logger.error(`Invalid status: ${updateLoanDto.status}`);
      
      throw new BadRequestException(`Status can only be updated to 'APPROVED' or 'REJECTED'`);
    }

    loan.status = updateLoanDto.status;
    return this.loanRepository.save(loan);
  }
}
