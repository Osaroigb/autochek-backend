import { IsString, IsInt, Min, MaxLength, Max } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @MaxLength(50)
  vin: string;

  @IsString()
  @MaxLength(25)
  make: string;

  @IsString()
  @MaxLength(25)
  model: string;

  @IsInt()
  @Min(1900)
  @Max(2025)
  year: number;

  @IsInt()
  @Min(0)
  mileage: number;
}
