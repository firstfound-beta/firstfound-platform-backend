// src/campaign-builder/campaign-builder.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CampaignBuilderService } from './campaign-builder.service';
import { CreateCampaignBuilderDto } from './dto/create-campaign-builder.dto';
import { UpdateCampaignBuilderDto } from './dto/update-campaign-builder.dto';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('campaign-builder')
export class CampaignBuilderController {
  constructor(private readonly service: CampaignBuilderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new campaign' })
  @ApiBody({ type: CreateCampaignBuilderDto })
  create(@Body() dto: CreateCampaignBuilderDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaigns' })
  findAll() {
    return this.service.findAll();
  }

  @Get('approved')
  @ApiOperation({ summary: 'Get all approved campaigns' })
  findApproved() {
    return this.service.findApproved();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get campaign by ID' })
  @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a campaign' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateCampaignBuilderDto })
  update(@Param('id') id: string, @Body() dto: UpdateCampaignBuilderDto) {
    return this.service.update(id, dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update campaign status' })
  @ApiParam({ name: 'id' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'approved',
          enum: ['pending', 'approved', 'rejected'],
        },
      },
    },
  })
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.service.updateStatus(id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a campaign' })
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
