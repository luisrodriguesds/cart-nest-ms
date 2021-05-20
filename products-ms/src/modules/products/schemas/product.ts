import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({
    type: Types.ObjectId,
  })
  productId: Types.ObjectId;

  @Prop()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
