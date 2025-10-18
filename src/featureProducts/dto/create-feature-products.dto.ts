import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MemberDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'CTO' })
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiProperty({ example: 'IIT Bombay' })
  @IsString()
  @IsNotEmpty()
  institution: string;

  @ApiProperty({ example: 'https://example.com/photo.jpg', required: false })
  @IsOptional()
  @IsString()
  photo?: string | null;

  @ApiProperty({ example: 'This is a short description', required: false })
  @IsOptional()
  @IsString()
  shortDescription?: string;
}
export class InstituteDto {
  @ApiProperty({ example: 'IIT Bombay' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Leading institute for innovation and research' })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreateFeatureProductsDto {
  @ApiProperty({ example: 'Techify Pvt Ltd' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({
    example: 'REG123456',
    description: 'Unique company registration number',
  })
  @IsString()
  @IsOptional()
  registrationNo: string;

  @ApiProperty({ example: 'https://techify.com', required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ example: 'Technology' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'Software Development' })
  @IsString()
  @IsNotEmpty()
  productType: string;

  @ApiProperty({ example: 'We build AI-powered automation tools.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https://example.com/logo.png', required: false })
  @IsOptional()
  @IsString()
  logo?: string | null;

  @ApiProperty({ example: 'https://example.com/cover.jpg', required: false })
  @IsOptional()
  @IsString()
  coverPhoto?: string | null;

  @ApiProperty({
    example: 'https://linkedin.com/company/techify',
    required: false,
  })
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiProperty({ example: 'https://instagram.com/techify', required: false })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiProperty({ example: 'https://twitter.com/techify', required: false })
  @IsOptional()
  @IsString()
  twitter?: string;

  @ApiProperty({
    type: [MemberDto],
    example: [
      {
        name: 'John Doe',
        designation: 'CEO',
        institution: 'IIT Delhi',
        photo: 'https://example.com/john.jpg',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MemberDto)
  founders: MemberDto[];

  @ApiProperty({
    type: [MemberDto],
    example: [
      {
        name: 'Jane Smith',
        designation: 'Developer',
        institution: 'NIT Trichy',
        photo: 'https://example.com/jane.jpg',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MemberDto)
  team: MemberDto[];

  @ApiProperty({ type: InstituteDto })
  @ValidateNested()
  @Type(() => InstituteDto)
  institute: InstituteDto;

  @ApiProperty({ example: 'Seed', required: false })
  @IsOptional()
  @IsString()
  stageDescription?: string;

  @ApiProperty({ example: 'seed', required: false })
  @IsOptional()
  @IsString()
  stage?: string;

  @ApiProperty({ example: 'This is a short description', required: false })
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiProperty({ example: 'Our target market is small businesses.' })
  @IsString()
  @IsNotEmpty()
  productDescription: string;

  @ApiProperty({
    example: '671fc12e4d3a54c0b7a1df5b',
    description: 'MongoDB ObjectId of the startup that owns this product',
  })
  @IsMongoId()
  @IsNotEmpty()
  startUpId: string;
}
