import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StateInfoDocument = StateInfo & Document;

@Schema()
export class StateInfo {
  @Prop()
  state: string;

  @Prop()
  capital: string;

  @Prop()
  slogan: string;

  @Prop([String])
  senatorial_districts: string[];

  @Prop([String])
  lgas: string[];

  @Prop()
  landmass: string;

  @Prop()
  population: string;

  @Prop()
  dialect: string;

  @Prop()
  map: string;

  @Prop()
  latitude: string;

  @Prop()
  longitude: string;

  @Prop()
  website: string;

  @Prop()
  region: string;

  @Prop()
  created_date: string;

  @Prop()
  created_by: string;

  @Prop([String])
  past_governors: string[];

  @Prop([String])
  borders: string[];

  @Prop([String])
  known_for: string[];
}

export const StateInfoSchema = SchemaFactory.createForClass(StateInfo);
