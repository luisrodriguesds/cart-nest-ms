import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { Product } from './schemas/product';

@Controller('')
export class ProductsController {
  private logger = new Logger('Main');

  constructor(private readonly productService: ProductsService) {}

  @MessagePattern('list')
  async list() {
    this.logger.log(`Showing products ...`);

    return this.productService.findAll();
  }

  @MessagePattern('create')
  async create(data: Product) {
    return this.productService.create(data);
  }
}
