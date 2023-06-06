import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema()
export class ApiKey {
  @ApiProperty({ description: 'Id of the API key' })
  @Prop({ default: () => new mongoose.Types.ObjectId().toHexString() })
  _id: string;

  @ApiProperty({ description: 'Key of the API key' })
  @Prop({ required: true })
  key: string;

  @ApiProperty({ description: 'Name of the user' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Email of the user' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ description: 'Password of the user' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: 'Creation date of the API key' })
  @Prop({ default: () => Date.now() })
  created: Date;

  @ApiProperty({ description: 'Expiration date of the API key' })
  @Prop({ default: () => Date.now() + 3600 * 1000 }) // expires after 1 hour
  expires: Date;
}

export type ApiKeyDocument = ApiKey & Document;
export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
