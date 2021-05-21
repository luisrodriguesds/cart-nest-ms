import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from './schemas/product';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(productId: string): Promise<Product | null> {
    if (!Types.ObjectId.isValid(productId)) {
      return null;
    }
    const product = await this.productModel.findOne({
      _id: Types.ObjectId(productId),
    });

    return product;
  }

  async create(product: Product): Promise<Product> {
    const productCreated = new this.productModel(product);
    return productCreated.save();
  }
}
