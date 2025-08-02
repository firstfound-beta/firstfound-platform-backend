import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  IsUrl,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Smart Water Bottle' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Keeps your water cool for 24 hours.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 499 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 75, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  fundingProgress?: number;

  @ApiProperty({ example: ['img1.png', 'img2.png'], required: false })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty({ example: ['tech', 'gadgets'], required: false })
  @IsArray()
  @IsOptional()
  categories?: string[];

  @ApiProperty({ example: 'https://youtube.com/demo' })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  demoVideoUrl: string;

  @ApiProperty({ example: 4.5 })
  @IsNumber()
  @Min(0)
  rating: number;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  @Min(0)
  amountRaised: number;

  @ApiProperty({ example: 85 })
  @IsNumber()
  @Min(0)
  percentageFunded: number;

  @ApiProperty({ example: 200 })
  @IsNumber()
  @Min(0)
  backersCount: number;
}
