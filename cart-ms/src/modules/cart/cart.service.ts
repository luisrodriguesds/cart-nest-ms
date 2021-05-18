import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  private logger = new Logger('Main');

  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
  ) {}

  async add(productCart: any) {
    this.logger.log('The product received is ');
    console.log(productCart);

    const cart = this.cartRepository.create({
      totalPrice: 10,
      totalQuantity: 1,
      userId: '1e717fd2-b828-11eb-8529-0242ac130003',
    });

    const resCart = await this.cartRepository.save(cart);
    return resCart;
  }
}
