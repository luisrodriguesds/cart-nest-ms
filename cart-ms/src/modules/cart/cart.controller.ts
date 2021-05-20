import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern('add')
  async add(productCart: any) {
    return this.cartService.add(productCart);
  }

  @MessagePattern('list')
  async list() {
    return this.cartService.findAll();
  }
}
