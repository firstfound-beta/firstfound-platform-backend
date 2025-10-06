import { PartialType } from '@nestjs/swagger';
import { CreateFeatureProductsDto } from './create-feature-products.dto';

export class UpdateFeatureProductsDto extends PartialType(
  CreateFeatureProductsDto,
) {}
