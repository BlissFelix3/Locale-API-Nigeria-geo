import {
  IsOptional,
  IsNumber,
  IsString,
  Min,
  IsIn,
  IsArray,
} from 'class-validator';

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

  //Exact matches for string field
  @IsString({ message: 'Capital must be a string' })
  @IsOptional()
  capital: string;

  @IsString({ message: 'Slogan must be a string' })
  @IsOptional()
  slogan: string;

  @IsString({ message: 'Landmass must be a string' })
  @IsOptional()
  landmass: string;

  @IsString({ message: 'Dialect must be a string' })
  @IsOptional()
  dialect: string;

  @IsString({ message: 'Map must be a string' })
  @IsOptional()
  map: string;

  @IsString({ message: 'Map must be a string' })
  @IsOptional()
  created_date: string;

  @IsString({ message: 'Map must be a string' })
  @IsOptional()
  created_by: string;

  @IsString({ message: 'Latitude must be a string' })
  @IsOptional()
  latitude: string;

  @IsString({ message: 'Longitude must be a string' })
  @IsOptional()
  longitude: string;

  @IsString({ message: 'Website must be a string' })
  @IsOptional()
  website: string;

  //Exact matches for array fields
  @IsArray({ message: 'Past governors must be an array of strings' })
  @IsOptional()
  past_governors: string[];

  @IsArray({ message: 'Borders must be an array of strings' })
  @IsOptional()
  borders: string[];

  @IsArray({ message: 'Known for must be an array of strings' })
  @IsOptional()
  known_for: string[];

  @IsArray({ message: 'Senatorial Districts must be an array of strings' })
  @IsOptional()
  senatorialDistricts: string[];
}
