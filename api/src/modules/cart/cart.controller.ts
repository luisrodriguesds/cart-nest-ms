import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCart } from './dto/add-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add')
  async add(@Body() addCart: AddCart) {
    return this.cartService.add(addCart);
  }

  @Get('/')
  async list() {
    return this.cartService.list();
  }

  @Delete('/:shoppingCartId')
  async remove(@Param() { shoppingCartId }, @Body() { userId }) {
    return this.cartService.remove({
      shoppingCartId,
      userId,
    });
  }
}
