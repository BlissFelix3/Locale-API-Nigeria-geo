import {
  IsOptional,
  IsNumber,
  IsString,
  Min,
  IsIn,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllParams {
  @ApiProperty({ description: 'Page number', required: false })
  @IsNumber({}, { message: 'Page must be a number' })
  @IsOptional()
  @Min(1)
  page: number;

  @ApiProperty({ description: 'Limit number', required: false })
  @IsNumber({}, { message: 'Limit must be a number' })
  @IsOptional()
  @Min(1)
  limit: number;

  @ApiProperty({ description: 'Sort field', required: false })
  @IsString({ message: 'Sort Field must be string' })
  @IsOptional()
  sortField: string;

  @ApiProperty({
    description: 'Sort order',
    enum: ['asc', 'desc'],
    required: false,
  })
  @IsString({ message: 'Sort Order must be string' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: string;

  @ApiProperty({ description: 'Filter', required: false })
  @IsString({ message: 'Filter must be string' })
  @IsOptional()
  filter: string;

  @ApiProperty({ description: 'Population greater than', required: false })
  @IsNumber({}, { message: 'Population Greater Than must be a number' })
  @IsOptional()
  @Min(1)
  populationGt: number;

  @ApiProperty({ description: 'Population less than', required: false })
  @IsNumber({}, { message: 'Population Less Than must be a number' })
  @IsOptional()
  @Min(1)
  populationLt: number;

  @ApiProperty({ description: 'Capital', required: false })
  @IsString({ message: 'Capital must be a string' })
  @IsOptional()
  capital: string;

  @ApiProperty({ description: 'Slogan', required: false })
  @IsString({ message: 'Slogan must be a string' })
  @IsOptional()
  slogan: string;

  @ApiProperty({ description: 'Landmass', required: false })
  @IsString({ message: 'Landmass must be a string' })
  @IsOptional()
  landmass: string;

  @ApiProperty({ description: 'Dialect', required: false })
  @IsString({ message: 'Dialect must be a string' })
  @IsOptional()
  dialect: string;

  @ApiProperty({ description: 'Map', required: false })
  @IsString({ message: 'Map must be a string' })
  @IsOptional()
  map: string;

  @ApiProperty({ description: 'Created date', required: false })
  @IsString({ message: 'Created date must be a string' })
  @IsOptional()
  created_date: string;

  @ApiProperty({ description: 'Created by', required: false })
  @IsString({ message: 'Created by must be a string' })
  @IsOptional()
  created_by: string;

  @ApiProperty({ description: 'Latitude', required: false })
  @IsString({ message: 'Latitude must be a string' })
  @IsOptional()
  latitude: string;

  @ApiProperty({ description: 'Longitude', required: false })
  @IsString({ message: 'Longitude must be a string' })
  @IsOptional()
  longitude: string;

  @ApiProperty({ description: 'Website', required: false })
  @IsString({ message: 'Website must be a string' })
  @IsOptional()
  website: string;

  @ApiProperty({
    description: 'Past governors',
    type: [String],
    required: false,
  })
  @IsArray({ message: 'Past governors must be an array of strings' })
  @IsOptional()
  past_governors: string[];

  @ApiProperty({ description: 'Borders', type: [String], required: false })
  @IsArray({ message: 'Borders must be an array of strings' })
  @IsOptional()
  borders: string[];

  @ApiProperty({ description: 'Known for', type: [String], required: false })
  @IsArray({ message: 'Known for must be an array of strings' })
  @IsOptional()
  known_for: string[];

  @ApiProperty({
    description: 'Senatorial Districts',
    type: [String],
    required: false,
  })
  @IsArray({ message: 'Senatorial Districts must be an array of strings' })
  @IsOptional()
  senatorial_districts: string[];
}
