import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema()
export class ApiKey extends Document {
  @Prop({ default: () => new mongoose.Types.ObjectId().toHexString() })
  _id: string;

  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
