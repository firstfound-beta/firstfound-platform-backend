import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeWebhookController } from './stripe-webhook.controller';
import { StripeService } from './stripe.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Product,
  ProductDocument,
  ProductSchema,
} from '../products/schemas/products.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [StripeController, StripeWebhookController],
  providers: [StripeService],
})
export class StripeModule {}
