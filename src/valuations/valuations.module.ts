import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Valuation } from '../entities/valuation.entity';
import { ValuationsService } from './valuations.service';
import { ValuationsController } from './valuations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Valuation])],
  providers: [ValuationsService],
  controllers: [ValuationsController],
})

export class ValuationsModule {}
