import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCart } from './product-cart.entity';

@Entity()
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

  @OneToMany(() => ProductCart, (productCart) => productCart.cart)
  products: ProductCart[];
}
