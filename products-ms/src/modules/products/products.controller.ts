import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('')
export class ProductsController {
  private logger = new Logger('Main');

  @MessagePattern('list')
  async list(id: number) {
    this.logger.log(`The product id is ${id}`);
    const data = [
      {
        productId: '192663',
        price: 267,
      },
    ];

    return data;
  }
}
