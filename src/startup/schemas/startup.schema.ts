// src/startup/schemas/startup.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StartupDocument = Startup & Document;

@Schema({ timestamps: true })
export class Startup {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  aboutStartup: string;

  @Prop({ required: true })
  founderEmail: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  confirmPassword: string;

  @Prop({ required: true })
  productDescription: string;

  @Prop({ required: true })
  founderName: string;

  @Prop()
  companyWebsite?: string;

  @Prop()
  pitchDeckUrl?: string;

  @Prop()
  InstituteName?: string;

  @Prop()
  teamMembers?: number;

  @Prop()
  stage?: string; // e.g., 'idea', 'prototype', 'launched'

  @Prop()
  address?: string;

  @Prop({ default: 'pending' }) // could be 'pending', 'approved', 'rejected'
  status: string;
}

export const StartupSchema = SchemaFactory.createForClass(Startup);
