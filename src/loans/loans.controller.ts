import { LoansService } from './loans.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateLoanDto } from '../dto/create-loan.dto';
import { UpdateLoanStatusDto } from '../dto/update-loan-status.dto';
import { LoanApplication } from '../entities/loan-application.entity.js';
import { Controller, Post, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';

@Controller('loans')
@UseGuards(JwtAuthGuard)
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
