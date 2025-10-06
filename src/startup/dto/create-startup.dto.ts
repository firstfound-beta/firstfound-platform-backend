import { IsEmail, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStartupDto {
  @ApiProperty({ example: 'TechNova Pvt. Ltd.' })
  @IsString()
  companyName: string;

  @ApiProperty({ example: 'A startup focused on AI-driven educational tools.' })
  @IsString()
  aboutStartup: string;

  @ApiProperty({
    example: 'founder@technova.com',
  })
  @IsEmail()
  founderEmail: string;

  @ApiProperty({ example: 'StrongPassword123' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'StrongPassword123' })
  @IsString()
  confirmPassword: string;

  @ApiProperty({
    example: 'An AI-based system that personalizes student learning.',
  })
  @IsString()
  productDescription: string;

  @ApiProperty({ example: 'Rahul Sharma' })
  @IsString()
  founderName: string;

  @ApiProperty({
    example: '[https://technova.com](https://technova.com)',
    required: false,
  })
  @IsOptional()
  @IsString()
  companyWebsite?: string;

  @ApiProperty({
    example: '[https://pitchdeck.com/technova](https://pitchdeck.com/technova)',
    required: false,
  })
  @IsOptional()
  @IsString()
  pitchDeckUrl?: string;

  @ApiProperty({ example: 'National Institute of Technology', required: false })
  @IsOptional()
  @IsString()
  InstituteName?: string;

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  @IsNumber()
  teamMembers?: number;

  @ApiProperty({ example: 'prototype', required: false })
  @IsOptional()
  @IsString()
  stage?: string;

  @ApiProperty({ example: 'Jaipur, Rajasthan', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: 'pending',
    description: "Status can be 'pending', 'approved', or 'rejected'",
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;
}
