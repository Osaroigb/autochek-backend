import { VehiclesService } from './vehicles.service';
import { Vehicle } from '../entities/vehicle.entity';
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CreateVehicleDto } from '../common/dto/create-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Vehicle> {
    return this.vehiclesService.findOne(id);
  }
}
