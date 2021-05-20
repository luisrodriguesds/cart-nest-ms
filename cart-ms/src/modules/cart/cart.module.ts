import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { ProductCart } from './entities/product-cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, ProductCart])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
