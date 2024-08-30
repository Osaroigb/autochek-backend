import { ValuationsService } from './valuations.service';
import { Valuation } from '../entities/valuation.entity';
import { Controller, Post, Get, Param, Body } from '@nestjs/common';

@Controller('vehicles')
export class ValuationsController {
  constructor(private readonly valuationsService: ValuationsService) {}

  @Post(':id/valuation')
  async create(
    @Param('id') vehicleId: number,
  ): Promise<Valuation> {
    return this.valuationsService.create(vehicleId);
  }

  @Get('valuations/:id')
  async findOne(@Param('id') id: number): Promise<Valuation> {
    return this.valuationsService.findOne(id);
  }
}