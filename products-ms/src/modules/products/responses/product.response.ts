import { ObjectId } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';

export class ProductResponse {
  @Exclude()
  _id: ObjectId;

  @Expose()
  get productId(): string {
    return `${this._id}`;
  }

  price: number;

  @Exclude()
  __v: number;

  constructor(partil: Partial<ProductResponse>) {
    Object.assign(this, partil);
  }
}
