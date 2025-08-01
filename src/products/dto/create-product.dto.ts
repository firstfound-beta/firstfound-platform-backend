import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  fundingProgress?: number;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsArray()
  @IsOptional()
  categories?: string[];

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  demoVideoUrl: string;

  @IsNumber()
  @Min(0)
  rating: number;

  @IsNumber()
  @Min(0)
  amountRaised: number;

  @IsNumber()
  @Min(0)
  percentageFunded: number;

  @IsNumber()
  @Min(0)
  backersCount: number;
}
