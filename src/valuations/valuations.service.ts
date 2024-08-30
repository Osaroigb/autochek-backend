import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { RapidApiService } from './rapidapi.service';
import { Valuation } from '../entities/valuation.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateValuationDto } from '../common/dto/create-valuation.dto';

@Injectable()
export class ValuationsService {
  constructor(
    @InjectRepository(Valuation)
    private readonly rapidApiService: RapidApiService,
    private readonly valuationRepository: Repository<Valuation>,
  ) {}

  async create(
    vehicleId: number,
  ): Promise<Valuation> {
    //? Fetch the vehicle entity using the vehicleId
    const vehicleRepository =
      this.valuationRepository.manager.getRepository(Vehicle);

    const vehicle = await vehicleRepository.findOne({
      where: {
        id: vehicleId,
      },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${vehicleId} not found`);
    }

    //? Get the VIN number from the vehicle entity
    const vin = vehicle.vin;

    //? Make the API request to RapidAPI using the VIN number
    const valuationData = await this.rapidApiService.getValuation(vin);

    //? Create a new Valuation object using the CreateValuationDto
    const createValuation: CreateValuationDto = {
      uid: valuationData.uid,
      loanValue: valuationData.loan_value,
      tradeInValue: valuationData.trade_in_value,
      adjustedTradeInValue: valuationData.adjusted_trade_in_value,
      make: valuationData.make,
      makeCode: valuationData.make_code,
      model: valuationData.model,
      modelCode: valuationData.model_code,
      trim: valuationData.trim,
      trimCode: valuationData.trim_code,
      year: valuationData.year,
      retailValue: valuationData.retail_value,
      msrpValue: valuationData.msrp_value,
      averageTradeIn: valuationData.average_trade_in,
      weight: valuationData.weight,
      mileageAdjustment: valuationData.mileage_adjustment,
      vehicleId: vehicleId,
    };

    //? Create a new Valuation entity using the CreateValuationDto
    const valuation: Valuation = this.valuationRepository.create(createValuation);
    return this.valuationRepository.save(valuation);

    // const valuation = this.valuationRepository.create({
    //   ...valuationData,
    //   vehicle: { id: vehicleId }, //? TypeScript needs type casting
    // });

    // return this.valuationRepository.save(valuation)[0];
  }

async findOne(id: number): Promise<Valuation> {
    const valuation = await this.valuationRepository.findOne({
      where: { id },
      relations: ['vehicle'],
    });

    if (!valuation) {
      throw new NotFoundException(`Vehicle valuation with ID ${id} not found`);
    }

    return valuation;
  }
}
