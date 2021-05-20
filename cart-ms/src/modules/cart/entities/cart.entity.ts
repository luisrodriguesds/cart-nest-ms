import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCart } from './product-cart.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  shoppingCartId: string;

  @Column({
    type: 'uuid',
    name: 'user_id',
  })
  userId: string;

  @Column({
    name: 'total_price',
    type: 'decimal',
  })
  totalPrice: number;

  @Column({
    name: 'total_quantity',
  })
  totalQuantity: number;

  @OneToMany(() => ProductCart, (productCart) => productCart.cart)
  products: ProductCart[];
}
