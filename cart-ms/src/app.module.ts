import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './modules/cart/cart.module';
import { Cart } from './modules/cart/entities/cart.entity';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [Cart],
    }),
    CartModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
