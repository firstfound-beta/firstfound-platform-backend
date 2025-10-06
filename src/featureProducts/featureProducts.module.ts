import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './featureProducts.service';
import { ProductsController } from './featureProducts.controller';
import {
  FeatureProducts,
  FeatureProductsSchema,
} from './schemas/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FeatureProducts.name, schema: FeatureProductsSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
