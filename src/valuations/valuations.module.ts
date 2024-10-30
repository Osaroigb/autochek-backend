import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RapidApiService } from './rapidapi.service';
import { Vehicle } from '../entities/vehicle.entity';
import { Valuation } from '../entities/valuation.entity';
import { ValuationsService } from './valuations.service';
import { ValuationsController } from './valuations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Valuation, Vehicle])],
  providers: [ValuationsService, RapidApiService],
  controllers: [ValuationsController],
})
export class ValuationsModule {}
