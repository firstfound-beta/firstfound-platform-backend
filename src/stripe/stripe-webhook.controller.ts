import { Controller, Post, Req, Headers } from '@nestjs/common';
import Stripe from 'stripe';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../products/schemas/products.schema';

@Controller('webhook')
export class StripeWebhookController {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  @Post()
  async handleWebhook(
    @Req() req: any,
    @Headers('stripe-signature') sig: string,
  ) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {});

    const payload = req.rawBody;
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      throw new Error(`Webhook signature verification failed: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const productId = session.metadata?.productId;

      if (productId) {
        await this.productModel.findByIdAndUpdate(productId, {
          $inc: { amountRaised: session.amount_total! / 100, backersCount: 1 },
        });
      }
    }

    return { received: true };
  }
}
