import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginStartupDto {
  @ApiProperty({
    description: 'Founder’s registered email address',
    example: 'founder@example.com',
  })
  @IsEmail()
  founderEmail: string;

  @ApiProperty({
    description: 'Account password',
    example: 'StrongPassword123',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
