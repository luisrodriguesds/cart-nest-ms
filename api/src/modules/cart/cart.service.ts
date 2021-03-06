import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { AddCart } from './dto/add-cart.dto';
import { RemoveCart } from './dto/remove-cart.dto';

@Injectable()
export class CartService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8878,
      },
    });
  }

  async add(addCart: AddCart) {
    return this.client.send<any, AddCart>('add', addCart);
  }

  async show(shoppingCartId: string) {
    return this.client.send<any, string>('show', shoppingCartId);
  }

  async remove(removeCart: RemoveCart) {
    return this.client.send<any, RemoveCart>('remove', removeCart);
  }
}
