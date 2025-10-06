import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CampaignBuilder,
  CampaignBuilderSchema,
} from './schemas/campaign-builder.schema';
import { CampaignBuilderService } from './campaign-builder.service';
import { CampaignBuilderController } from './campaign-builder.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CampaignBuilder.name, schema: CampaignBuilderSchema },
    ]),
  ],
  controllers: [CampaignBuilderController],
  providers: [CampaignBuilderService],
})
export class CampaignBuilderModule {}
