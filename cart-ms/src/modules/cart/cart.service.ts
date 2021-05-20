import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { ProductCart } from './entities/product-cart.entity';

@Injectable()
export class CartService {
  private logger = new Logger('Main');

  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(ProductCart)
    private productCartRepository: Repository<ProductCart>,
  ) {}

  async add(productCart: any) {
    this.logger.log('The product received is ');
    console.log(productCart);

    const cart = this.cartRepository.create({
      totalPrice: 10.3,
      totalQuantity: 1,
      userId: '1e717fd2-b828-11eb-8529-0242ac130003',
    });

    const resCart = await this.cartRepository.save(cart);

    const prodCart = this.productCartRepository.create({
      cart_id: resCart.shoppingCartId,
      price: 10.3,
      productId: '1e717fd2-b828-11eb-8529-0242ac130003',
      quantity: 2,
    });
    const resProdCart = await this.productCartRepository.save(prodCart);

    return {
      ...resCart,
      products: [resProdCart],
    };
  }

  async findAll() {
    const carts = await this.cartRepository.find({
      relations: ['products'],
    });

    return carts;
  }
}
