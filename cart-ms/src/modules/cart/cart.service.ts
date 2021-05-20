import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { AddCartReceive } from './dto/add-cart-receive.dto';
import { RemoveCartReceive } from './dto/remove-cart-receive.dto';
import { Cart } from './entities/cart.entity';
import { ProductCart } from './entities/product-cart.entity';

@Injectable()
export class CartService {
  private logger = new Logger('Main');

  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(ProductCart)
    private productCartRepository: Repository<ProductCart>,
    private readonly productsService: ProductsService,
  ) {}

  async add(productCart: AddCartReceive) {
    this.logger.log('The product received is ');
    // Validate data

    // Check IF Product Id Check
    const resProduct = await this.productsService.findOne(
      productCart.productId,
    );

    if (!resProduct) {
      throw new Error('The product was not found.');
    }

    // Check if the cart already exist for this user
    const getCart = await this.cartRepository.findOne({
      relations: ['products'],
      where: { userId: productCart.userId },
    }); // undefined

    const productData = {
      productId: resProduct.productId,
      quantity: productCart.quantity,
      price: resProduct.price,
    };
    if (!getCart) {
      const storeCart = this.cartRepository.create({
        userId: productCart.userId,
        totalQuantity: productCart.quantity,
        totalPrice: resProduct.price,
        products: [productData],
      });
      const resCart = await this.cartRepository.save(storeCart);
      const storeProductCart = this.productCartRepository.create({
        ...productData,
        cartId: storeCart.shoppingCartId,
      });
      await this.productCartRepository.save(storeProductCart);
      return resCart;
    }

    // Check if this product already exist for this cart
    const checkHasProductCart = getCart.products.find(
      (product) => product.productId === productCart.productId,
    );
    if (checkHasProductCart) {
      throw new Error('This product already exist for this cart.');
    }

    const updateCart = {
      shoppingCartId: getCart.shoppingCartId,
      totalQuantity:
        getCart.products
          .map((prod) => prod.quantity)
          .reduce((arr, curr) => curr + arr, 0) + productCart.quantity,
      totalPrice:
        getCart.products
          .map((prod) => Number(prod.price))
          .reduce((arr, curr) => curr + arr, 0) + Number(resProduct.price),
    };
    await this.cartRepository.save(updateCart);
    const storeProductCart = this.productCartRepository.create({
      ...productData,
      cartId: getCart.shoppingCartId,
    });
    const resProductCart = await this.productCartRepository.save(
      storeProductCart,
    );

    return {
      ...updateCart,
      products: [...getCart.products, resProductCart],
    };
  }

  async findAll() {
    const carts = await this.cartRepository.find({
      relations: ['products'],
    });

    return carts;
  }

  async remove(removeCart: RemoveCartReceive) {
    console.log(removeCart, 'aqui');
    return {};
  }
}
