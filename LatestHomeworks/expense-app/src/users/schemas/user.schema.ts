import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password?: string;

  @Prop({ enum: ['m', 'f'] })
  gender: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: () => new Date() })
  subscriptionStartDate: Date;

  @Prop({ default: () => new Date(new Date().setMonth(new Date().getMonth() + 1)) })
  subscriptionEndDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);