import { IsOptional, IsNumber, IsString, Min, IsIn } from 'class-validator';

export class FindAllParams {
  @IsNumber({}, { message: 'Page must be a number' })
  @IsOptional()
  @Min(1)
  page: number;

  @IsNumber({}, { message: 'Limit must be a number' })
  @IsOptional()
  @Min(1)
  limit: number;

  @IsString({ message: 'Sort Feild must be string' })
  @IsOptional()
  sortField: string;

  @IsString({ message: 'Sort Order must be string' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: string;

  @IsString({ message: 'Filter must be string' })
  @IsOptional()
  filter: string;

  @IsNumber({}, { message: 'Population Greater Than must be a number' })
  @IsOptional()
  @Min(1)
  populationGt: number;

  @IsNumber({}, { message: 'Population Less Than must be a number' })
  @IsOptional()
  @Min(1)
  populationLt: number;
}
