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

  async add(productCartReceived: AddCartReceive) {
    this.logger.log('The product received is ');
    // Validate data

    const product = await this.productsService.findOne(
      productCartReceived.productId,
    );

    if (!product) {
      throw new Error('The product was not found.');
    }

    // Considering that the user can have just one cart until finishing his shopping
    const cart = await this.cartRepository.findOne({
      relations: ['products'],
      where: { userId: productCartReceived.userId },
    });

    const productData = {
      productId: product.productId,
      quantity: productCartReceived.quantity,
      price: product.price,
    };
    if (!cart) {
      const storeCart = this.cartRepository.create({
        userId: productCartReceived.userId,
        products: [productData],
      });
      const resCart = await this.cartRepository.save(storeCart);

      const storeProductCart = this.productCartRepository.create({
        ...productData,
        cartId: resCart.shoppingCartId,
      });
      const resProductCart = await this.productCartRepository.save(
        storeProductCart,
      );
      return {
        ...resCart,
        totalQuantity: productCartReceived.quantity,
        totalPrice: product.price,
        products: [resProductCart],
      };
    }

    const checkHasProductCart = cart.products.find(
      (product) => product.productId === productCartReceived.productId,
    );
    if (checkHasProductCart) {
      throw new Error('This product already exist for this cart.');
    }

    const storeProductCart = this.productCartRepository.create({
      ...productData,
      cartId: cart.shoppingCartId,
    });
    const resProductCart = await this.productCartRepository.save(
      storeProductCart,
    );

    const totalQuantity =
      cart.products
        .map((prod) => prod.quantity)
        .reduce((arr, curr) => curr + arr, 0) + productCartReceived.quantity;
    const totalPrice =
      cart.products
        .map((prod) => prod.price * product.quantity)
        .reduce((arr, curr) => curr + arr, 0) +
      product.price * productCartReceived.quantity;

    return {
      ...cart,
      totalQuantity,
      totalPrice,
      products: [...cart.products, resProductCart],
    };
  }

  async findAll() {
    const carts = await this.cartRepository.find({
      relations: ['products'],
    });

    const parseCarts = carts.map((cart) => {
      return {
        ...cart,
        totalQuantity: cart.products
          .map((product) => product.quantity)
          .reduce((arr, curr) => arr + curr, 0),
        totalPrice: cart.products
          .map((product) => product.price * product.quantity)
          .reduce((arr, curr) => arr + curr, 0),
      };
    });
    return parseCarts;
  }

  async remove(removeCart: RemoveCartReceive) {
    // Considering that the user can have just one cart until finishing his shopping
    const getCart = await this.cartRepository.findOne({
      where: { userId: removeCart.userId },
      relations: ['products'],
    });

    if (!getCart) {
      throw new Error("This user don't have any cart open");
    }

    const checkHasProduct = getCart.products.find(
      (product) => product.productId === removeCart.productId,
    );

    if (!checkHasProduct) {
      throw new Error("This user don't have this product in his cart");
    }

    await this.productCartRepository.delete({
      cartId: getCart.shoppingCartId,
      productId: removeCart.productId,
    });

    return;
  }
}
