// src/campaign-builder/dto/update-campaign-builder.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateCampaignBuilderDto } from './create-campaign-builder.dto';

export class UpdateCampaignBuilderDto extends PartialType(
  CreateCampaignBuilderDto,
) {}
