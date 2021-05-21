import { Exclude, Transform } from 'class-transformer';

export class ProductCartResponse {
  @Exclude()
  id: string;

  @Exclude()
  cartId: string;

  productId: string;

  @Transform(({ value }) => Number(value))
  price: number;

  quantity: number;

  constructor(partil: Partial<ProductCartResponse>) {
    Object.assign(this, partil);
  }
}
