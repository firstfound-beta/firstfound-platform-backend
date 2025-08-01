// src/startup/dto/create-startup.dto.ts
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateStartupDto {
  @IsString()
  startupName: string;

  @IsString()
  contactName: string;

  @IsEmail()
  email: string;

  @IsString()
  productDescription: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  pitchDeckUrl?: string;
}
