import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class CreateStripeDto {
  @ApiProperty({
    example: '64f8b1c2a1d3e4567890abcd',
    description: 'MongoDB ID of the product to purchase',
  })
  @IsMongoId()
  productId: string;
}
