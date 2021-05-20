import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class ProductCart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'cart_id',
    type: 'uuid',
  })
  cart_id: string;

  @OneToOne(() => Cart, (cart) => cart.shoppingCartId)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'shoppingCartId' })
  cart: Cart;

  @Column({ type: 'uuid', name: 'product_id' })
  productId: string;

  @Column({
    type: 'decimal',
  })
  price: number;

  @Column()
  quantity: number;
}
