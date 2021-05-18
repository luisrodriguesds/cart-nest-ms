import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Post()
  async create(@Body() product) {
    const { productId, price } = product;
    return this.productsService.create({
      price,
      productId,
    });
  }

  @Get(':product_id')
  async findOne(@Param() { product_id }) {
    return this.productsService.findOne(product_id);
  }
}
