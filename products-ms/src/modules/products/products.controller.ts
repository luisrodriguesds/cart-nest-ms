import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { classToPlain } from 'class-transformer';
import { ProductsService } from './products.service';
import { Product } from './schemas/product';
import { ProductResponse } from './responses/product.response';

@Controller('')
export class ProductsController {
  private logger = new Logger('Main');

  constructor(private readonly productService: ProductsService) {}

  @MessagePattern('list')
  async list() {
    this.logger.log(`Showing products ...`);
    const products = await this.productService.findAll();
    const productsResponse = products.map((prod) =>
      classToPlain(new ProductResponse(prod.toJSON())),
    );
    return productsResponse;
  }

  @MessagePattern('create')
  async create(data: Product) {
    const product = await this.productService.create(data);
    const productResponse = classToPlain(new ProductResponse(product.toJSON()));
    return productResponse;
  }

  @MessagePattern('find')
  async find(productId: string) {
    const product = await this.productService.findOne(productId);
    if (!product) {
      return product;
    }
    const productResponse = classToPlain(
      new ProductResponse(product?.toJSON()),
    );
    return productResponse;
  }
}
