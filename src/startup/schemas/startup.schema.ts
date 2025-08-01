// src/startup/schemas/startup.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StartupDocument = Startup & Document;

@Schema({ timestamps: true })
export class Startup {
  @Prop({ required: true })
  startupName: string;

  @Prop({ required: true })
  contactName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  productDescription: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  website?: string;

  @Prop()
  pitchDeckUrl?: string;

  @Prop({ default: 'pending' }) // could be 'pending', 'approved', 'rejected'
  status: string;
}

export const StartupSchema = SchemaFactory.createForClass(Startup);
