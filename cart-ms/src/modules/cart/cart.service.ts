import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CartService {
  private logger = new Logger('Main');
  async add(productCart: any) {
    this.logger.log('The product received is ');
    console.log(productCart);
    return productCart;
  }
}
