import { IsDecimal, IsString, MaxLength, IsInt, Max } from 'class-validator';

export class CreateValuationDto {
  @IsString()
  @MaxLength(50)
  uid: string;

  @IsDecimal()
  @Max(500000000) //? Assuming a maximum loan value of 500 million
  loanValue: number;

  @IsDecimal()
  @Max(500000000) //? Assuming a maximum trade-in value of 500 million
  tradeInValue: number;

  @IsDecimal()
  @Max(500000000) //? Assuming a maximum adjusted trade-in value of 500 million
  adjustedTradeInValue: number;

  @IsString()
  @MaxLength(50)
  make: string;

  @IsString()
  @MaxLength(50)
  makeCode: string;

  @IsString()
  @MaxLength(50)
  model: string;

  @IsString()
  @MaxLength(50)
  modelCode: string;

  @IsString()
  @MaxLength(100)
  trim: string;

  @IsString()
  @MaxLength(50)
  trimCode: string;

  @IsInt()
  year: number;

  @IsDecimal()
  @Max(500000000) //? Assuming a maximum retail value of 500 million
  retailValue: number;

  @IsDecimal()
  @Max(500000000) //? Assuming a maximum MSRP value of 500 million
  msrpValue: number;

  @IsDecimal()
  @Max(500000000) //? Assuming a maximum average trade-in value of 500 million
  averageTradeIn: number;

  @IsInt()
  weight: number;

  @IsInt()
  mileageAdjustment: number;

  @IsInt()
  vehicleId: number; //? Assuming the vehicle ID is passed as an integer
}
