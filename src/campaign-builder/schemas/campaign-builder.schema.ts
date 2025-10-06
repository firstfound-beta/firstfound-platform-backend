// src/campaign-builder/schemas/campaign-builder.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// --- Milestone Subdocument Schema ---
@Schema({ _id: false })
export class Milestone {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  targetDate: string; // e.g., '2025-12-31'
}

const MilestoneSchema = SchemaFactory.createForClass(Milestone);

// --- Main CampaignBuilder Schema ---
export type CampaignBuilderDocument = CampaignBuilder & Document;

@Schema({ timestamps: true })
export class CampaignBuilder {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  fund: string;

  @Prop({ required: true })
  ticketSize: string;

  @Prop({ required: true })
  perks: string;

  @Prop({ required: true })
  mrsp: string;

  @Prop({ required: true })
  deliveryDate: string;

  @Prop({ type: [MilestoneSchema], default: [] })
  milestones: Milestone[];

  @Prop({ required: true })
  fundUtilization: string;

  @Prop()
  pitchDeck: string;

  @Prop()
  securityDocs: string;

  @Prop({ required: true })
  gst: string;

  @Prop({ required: true })
  pan: string;

  @Prop()
  kyc: string;

  @Prop()
  keyCert: string;

  @Prop()
  video: string;

  @Prop({ required: true })
  teamDetails: string;

  @Prop({ required: true })
  problemSolved: string;

  @Prop({ default: 'pending' })
  status: string;
}

export const CampaignBuilderSchema =
  SchemaFactory.createForClass(CampaignBuilder);
