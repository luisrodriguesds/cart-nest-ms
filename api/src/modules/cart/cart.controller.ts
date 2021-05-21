import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { MicroservicesExceptionFilter } from '../../filters/microservice-exception.filter';
import { CartService } from './cart.service';
import { AddCart } from './dto/add-cart.dto';

@Controller('cart')
@UseFilters(new MicroservicesExceptionFilter())
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/')
  async add(@Body() addCart: AddCart) {
    return this.cartService.add(addCart);
  }

  @Get('/:shoppingCartId')
  async show(@Param() { shoppingCartId }) {
    return this.cartService.show(shoppingCartId);
  }

  @Delete('/:productId')
  async remove(@Param() { productId }, @Body() { userId }) {
    return this.cartService.remove({
      productId,
      userId,
    });
  }
}
