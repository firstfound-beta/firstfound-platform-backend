import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// --- Member Subdocument Schema ---
@Schema({ _id: false })
export class Member {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  designation: string;

  @Prop({ required: true })
  institution: string;

  @Prop({ default: null })
  photo: string | null;
}

const MemberSchema = SchemaFactory.createForClass(Member);

// --- Main FeatureProducts Schema ---
export type FeatureProductsDocument = FeatureProducts & Document;

@Schema({ timestamps: true })
export class FeatureProducts {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: false })
  registrationNo: string;

  @Prop()
  website: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  productType: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: null })
  logo: string | null;

  @Prop({ default: null })
  coverPhoto: string | null;

  @Prop()
  linkedin: string;

  @Prop()
  instagram: string;

  @Prop()
  twitter: string;

  @Prop({ type: [MemberSchema], default: [] })
  founders: Member[];

  @Prop({ type: [MemberSchema], default: [] })
  team: Member[];

  @Prop()
  targetMarket: string;

  @Prop({ default: 'pending' }) // could be 'pending', 'approved', 'rejected'
  status: string;
}

export const FeatureProductsSchema =
  SchemaFactory.createForClass(FeatureProducts);
