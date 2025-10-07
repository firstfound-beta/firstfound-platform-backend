import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, UpdateQuery } from 'mongoose';
import * as bcrypt from 'bcryptjs';
@Schema({ timestamps: true }) // ✅ <-- Add this line
export class User extends Document {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  confirmPassword: string;

  @Prop()
  fullName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as UpdateQuery<User>;

  if (update.password && !update.password.startsWith('$2')) {
    update.password = await bcrypt.hash(update.password, 10);
  }
  next();
});
