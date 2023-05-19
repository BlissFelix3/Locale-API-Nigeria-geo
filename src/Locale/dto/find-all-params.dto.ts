import { IsOptional, IsNumber, IsString, Min, IsIn } from 'class-validator';

export class FindAllParams {
  @IsNumber()
  @IsOptional()
  @Min(1)
  page: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  limit: number;

  @IsString()
  @IsOptional()
  sortField: string;

  @IsString()
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: string;

  @IsString()
  @IsOptional()
  filter: string;
}
