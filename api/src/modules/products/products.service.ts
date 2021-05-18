import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

interface IProduct {
  productId: string;
  price: number;
}

@Injectable()
export class ProductsService {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
      },
    });
  }

  findAll() {
    return this.client.send<any, any>('list', '');
  }

  create(product: IProduct) {
    return this.client.send<any, IProduct>('create', product);
  }
}
