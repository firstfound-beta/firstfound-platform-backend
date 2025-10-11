import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// --- Member Subdocument ---
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

  @Prop()
  shortDescription?: string;
}
const MemberSchema = SchemaFactory.createForClass(Member);

// --- Institute Subdocument ---
@Schema({ _id: false }) // ⬅️ ensure no _id and Mongoose treats it as pure embedded doc
export class Institute {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;
}
const InstituteSchema = SchemaFactory.createForClass(Institute);

// --- Main FeatureProducts Schema ---
export type FeatureProductsDocument = FeatureProducts & Document;

@Schema({ timestamps: true })
export class FeatureProducts {
  @Prop({ required: true })
  companyName: string;

  @Prop()
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

  @Prop()
  productDescription: string;

  @Prop({ default: 'pending' })
  status: string;

  // ✅ Fixed institute schema embedding
  @Prop({ type: InstituteSchema, required: true })
  institute: Institute;

  @Prop()
  stageDescription?: string;

  @Prop()
  stage?: string;

  @Prop()
  shortDescription?: string;

  @Prop({ type: Types.ObjectId, ref: 'Startup', required: true })
  startUpId: Types.ObjectId;
}

export const FeatureProductsSchema =
  SchemaFactory.createForClass(FeatureProducts);
