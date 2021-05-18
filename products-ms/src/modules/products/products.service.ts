import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(productId: string): Promise<Product> {
    return this.productModel.findOne({ productId }).exec();
  }

  async create(product: Product): Promise<Product> {
    const productCreated = new this.productModel(product);
    return productCreated.save();
  }
}
