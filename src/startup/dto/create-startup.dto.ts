import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStartupDto {
  @ApiProperty({ example: 'GreenTech' })
  @IsString()
  startupName: string;

  @ApiProperty({ example: 'Jane Smith' })
  @IsString()
  contactName: string;

  @ApiProperty({ example: 'jane@greentech.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Eco-friendly solar panel manufacturing' })
  @IsString()
  productDescription: string;

  @ApiProperty({ example: 'Energy' })
  @IsString()
  category: string;

  @ApiProperty({ example: 'https://greentech.com', required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ example: 'https://pitchdeck.com/greentech', required: false })
  @IsOptional()
  @IsString()
  pitchDeckUrl?: string;
}
