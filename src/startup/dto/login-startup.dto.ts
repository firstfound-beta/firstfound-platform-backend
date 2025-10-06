// src/auth/dto/login-startup.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginStartupDto {
  @ApiProperty({
    example: 'founder@example.com',
    description: 'Email address of the startup founder',
  })
  @IsEmail()
  founderEmail: string;

  @ApiProperty({
    example: 'StrongPassword123',
    description: 'Password used during registration',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
