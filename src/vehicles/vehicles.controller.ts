import { VehiclesService } from './vehicles.service';
import { Vehicle } from '../entities/vehicle.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';

@Controller('vehicles')
@UseGuards(JwtAuthGuard)
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
