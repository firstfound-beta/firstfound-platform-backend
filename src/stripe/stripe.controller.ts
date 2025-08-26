import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../products/schemas/products.schema';
@Controller('payments')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  @Post('checkout')
  async createCheckout(@Body('productId') productId: string) {
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new Error('Product not found');
    }
    return this.stripeService.createCheckoutSession(product);
  }
}
