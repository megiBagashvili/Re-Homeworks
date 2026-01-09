import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Expense extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  productName: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop()
  amount: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);