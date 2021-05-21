import { Controller } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { MessagePattern } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { AddCartReceive } from './dto/add-cart-receive.dto';
import { RemoveCartReceive } from './dto/remove-cart-receive.dto';
import { ProductCartResponse } from './responses/product-cart.response';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern('add')
  async add(productCart: AddCartReceive) {
    const cart = await this.cartService.add(productCart);
    const cartResponse = {
      ...cart,
      products: cart.products.map((prod) =>
        classToPlain(new ProductCartResponse(prod)),
      ),
    };
    return cartResponse;
  }

  @MessagePattern('show')
  async show(shoppingCartId: string) {
    const cart = await this.cartService.findOne(shoppingCartId);
    const cartResponse = {
      ...cart,
      products: cart.products.map((prod) =>
        classToPlain(new ProductCartResponse(prod)),
      ),
    };
    return cartResponse;
  }

  @MessagePattern('remove')
  async remove(removeCart: RemoveCartReceive) {
    return this.cartService.remove(removeCart);
  }
}
