import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCart } from './dto/add-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add')
  async add(@Body() addCart: AddCart) {
    return this.cartService.add(addCart);
  }
}
