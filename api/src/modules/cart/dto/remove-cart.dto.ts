import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveCart {
  @IsNotEmpty({
    message: 'productId is empty',
  })
  @IsString()
  productId: string;

  @IsNotEmpty({
    message: 'userId is empty',
  })
  @IsString()
  userId: string;
}
