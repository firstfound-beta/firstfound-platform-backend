// src/campaign-builder/campaign-builder.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CampaignBuilder,
  CampaignBuilderDocument,
} from './schemas/campaign-builder.schema';
import { CreateCampaignBuilderDto } from './dto/create-campaign-builder.dto';
import { UpdateCampaignBuilderDto } from './dto/update-campaign-builder.dto';

@Injectable()
export class CampaignBuilderService {
  constructor(
    @InjectModel(CampaignBuilder.name)
    private campaignModel: Model<CampaignBuilderDocument>,
  ) {}

  async create(dto: CreateCampaignBuilderDto): Promise<CampaignBuilder> {
    const campaign = new this.campaignModel(dto);
    return campaign.save();
  }

  async findAll(): Promise<CampaignBuilder[]> {
    return this.campaignModel.find().exec();
  }

  async findOne(id: string): Promise<CampaignBuilder> {
    const campaign = await this.campaignModel.findById(id).exec();
    if (!campaign)
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    return campaign;
  }

  async update(
    id: string,
    dto: UpdateCampaignBuilderDto,
  ): Promise<CampaignBuilder> {
    const updated = await this.campaignModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated)
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleted = await this.campaignModel.findByIdAndDelete(id);
    if (!deleted)
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    return { message: `Campaign deleted successfully` };
  }

  async updateStatus(id: string, status: string): Promise<CampaignBuilder> {
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status))
      throw new NotFoundException('Invalid status');
    const updated = await this.campaignModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!updated)
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    return updated;
  }

  async findApproved(): Promise<CampaignBuilder[]> {
    return this.campaignModel.find({ status: 'approved' }).exec();
  }
}
