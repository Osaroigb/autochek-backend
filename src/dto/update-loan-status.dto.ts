import { IsString, MaxLength } from 'class-validator';

export class UpdateLoanStatusDto {
  @IsString()
  @MaxLength(10)
  status: string;
}
