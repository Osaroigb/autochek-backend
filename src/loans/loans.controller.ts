import { LoansService } from './loans.service';
import { CreateLoanDto } from '../common/dto/create-loan.dto';
import { LoanApplication } from '../entities/loan-application.entity';
import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { UpdateLoanStatusDto } from '../common/dto/update-loan-status.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  async create(@Body() createLoanDto: CreateLoanDto): Promise<LoanApplication> {
    return this.loansService.create(createLoanDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<LoanApplication> {
    return this.loansService.findOne(id);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body() updateLoanStatusDto: UpdateLoanStatusDto,
  ): Promise<LoanApplication> {
    return this.loansService.updateStatus(id, updateLoanStatusDto);
  }
}
