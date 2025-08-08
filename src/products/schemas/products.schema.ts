import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Milestone {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  percentage: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  icon: string; // Store icon name as string (e.g., "FileText")

  @Prop({ required: true })
  estimatedDays: number;

  @Prop({ required: true })
  color: string;
}

export const MilestoneSchema = SchemaFactory.createForClass(Milestone);

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  fundingProgress: number;

  @Prop({ default: [] })
  images: string[];

  @Prop({ required: true })
  demoVideoUrl: string;

  @Prop({ default: [] })
  categories: string[];

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  amountRaised: number;

  @Prop({ required: true })
  percentageFunded: number;

  @Prop({ required: true })
  backersCount: number;

  @Prop({ type: [MilestoneSchema], default: [] })
  milestones: Milestone[];
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
