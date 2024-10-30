import {
  Max,
  Min,
  IsInt,
  IsString,
  IsDecimal,
  MaxLength,
} from 'class-validator';

export enum LoanStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class CreateLoanDto {
  @IsInt()
  loanAmount: number;

  @IsDecimal()
  @Max(100) //? Assuming a maximum interest rate of 100%
  interestRate: number;

  @IsInt()
  @Min(1)
  @Max(30)
  loanTerm: number;

  @IsInt()
  creditScore: number;

  @IsDecimal()
  debtToIncomeRatio: number;

  @IsString()
  @MaxLength(10)
  status: string;

  @IsInt()
  @Min(1)
  userId: number; //? Assuming the user ID is passed as an integer

  @IsInt()
  @Min(1)
  vehicleId: number; //? Assuming the vehicle ID is passed as an integer
}
