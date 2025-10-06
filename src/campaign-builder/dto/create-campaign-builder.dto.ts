// src/campaign-builder/dto/create-campaign-builder.dto.ts
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// --- Milestone DTO ---
export class MilestoneDto {
  @ApiProperty({ example: 'Prototype completed' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Finish the first prototype for testing' })
  @IsString()
  description: string;

  @ApiProperty({ example: '2025-12-31' })
  @IsString()
  targetDate: string;
}

// --- Main CampaignBuilder DTO ---
export class CreateCampaignBuilderDto {
  @ApiProperty({ example: 'Smart Solar Panel' })
  @IsString()
  productName: string;

  @ApiProperty({ example: 'Eco-friendly solar panel for homes' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Energy' })
  @IsString()
  category: string;

  @ApiProperty({ example: '5000000' })
  @IsString()
  fund: string;

  @ApiProperty({ example: '50000' })
  @IsString()
  ticketSize: string;

  @ApiProperty({ example: 'Early access, Discounts' })
  @IsString()
  perks: string;

  @ApiProperty({ example: '150000' })
  @IsString()
  mrsp: string;

  @ApiProperty({ example: '2026-03-01' })
  @IsString()
  deliveryDate: string;

  @ApiProperty({ type: [MilestoneDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MilestoneDto)
  milestones: MilestoneDto[];

  @ApiProperty({ example: 'Fund will be used for production and marketing' })
  @IsString()
  fundUtilization: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  pitchDeck?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  securityDocs?: string;

  @ApiProperty({ example: '27AAAPL1234C1Z2' })
  @IsString()
  gst: string;

  @ApiProperty({ example: 'ABCDE1234F' })
  @IsString()
  pan: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  kyc?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  keyCert?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  video?: string;

  @ApiProperty({ example: 'John Doe, Jane Smith' })
  @IsString()
  teamDetails: string;

  @ApiProperty({ example: 'Solves home electricity cost issues' })
  @IsString()
  problemSolved: string;
}
