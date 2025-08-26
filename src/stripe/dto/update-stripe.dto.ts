import { ApiProperty } from '@nestjs/swagger';

export class UpdateStripeDto {
  @ApiProperty({
    example: 'evt_1N3kGy2eZvKYlo2Cz4aF4U7y',
    description: 'Stripe event ID',
  })
  eventId: string;

  @ApiProperty({
    example: 'checkout.session.completed',
    description: 'Stripe event type',
  })
  eventType: string;

  @ApiProperty({
    example: {
      id: 'cs_test_a1b2c3d4',
      object: 'checkout.session',
      payment_status: 'paid',
      amount_total: 5000,
      currency: 'usd',
      metadata: { productId: '64f8b1c2a1d3e4567890abcd' },
    },
    description: 'Event data payload from Stripe',
  })
  data: Record<string, any>;
}
