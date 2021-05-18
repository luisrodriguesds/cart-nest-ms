import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  shoppingCartId: string;

  @Column({
    type: 'uuid',
  })
  userId: string;

  @Column()
  totalPrice: number;

  @Column()
  totalQuantity: number;

  // products: Array<>;
}
