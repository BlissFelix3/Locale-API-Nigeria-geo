import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type StateInfoDocument = StateInfo & Document;

@Schema()
export class StateInfo {
  @ApiProperty({ description: 'State name' })
  @Prop({ text: true })
  state: string;

  @ApiProperty({ description: 'Capital' })
  @Prop()
  capital: string;

  @ApiProperty({ description: 'Slogan' })
  @Prop()
  slogan: string;

  @ApiProperty({ description: 'Senatorial districts', type: [String] })
  @Prop([String])
  senatorial_districts: string[];

  @ApiProperty({ description: 'Local Government Areas', type: [String] })
  @Prop({ type: [String], index: 'text' })
  lgas: string[];

  @ApiProperty({ description: 'Landmass' })
  @Prop()
  landmass: string;

  @ApiProperty({ description: 'Population' })
  @Prop()
  population: string;

  @ApiProperty({ description: 'Dialect' })
  @Prop()
  dialect: string;

  @ApiProperty({ description: 'Map' })
  @Prop()
  map: string;

  @ApiProperty({ description: 'Latitude' })
  @Prop()
  latitude: string;

  @ApiProperty({ description: 'Longitude' })
  @Prop()
  longitude: string;

  @ApiProperty({ description: 'Website' })
  @Prop()
  website: string;

  @ApiProperty({ description: 'Region' })
  @Prop()
  region: string;

  @ApiProperty({ description: 'Created date' })
  @Prop()
  created_date: string;

  @ApiProperty({ description: 'Created by' })
  @Prop()
  created_by: string;

  @ApiProperty({ description: 'Past governors', type: [String] })
  @Prop([String])
  past_governors: string[];

  @ApiProperty({ description: 'Borders', type: [String] })
  @Prop([String])
  borders: string[];

  @ApiProperty({ description: 'Known for', type: [String] })
  @Prop([String])
  known_for: string[];
}

export const StateInfoSchema = SchemaFactory.createForClass(StateInfo);
