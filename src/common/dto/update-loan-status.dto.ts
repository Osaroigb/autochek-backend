import { IsEnum, IsInt, Min } from 'class-validator';

export enum LoanStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class UpdateLoanStatusDto {
  @IsEnum(LoanStatus)
  status: LoanStatus;
}
