import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class AddCart {
  @IsNotEmpty({ message: 'UserId is empty' })
  @IsString()
  userId: string;

  @IsNotEmpty({ message: 'productId is empty' })
  @IsString()
  productId: string;

  @IsNotEmpty({ message: 'quantity is empty' })
  @Min(1, {
    message: 'quantity must be more than zero',
  })
  @IsNumber()
  quantity: number;
}
