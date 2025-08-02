import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/user.interface';

export class CreateUserDto implements Partial<IUser> {
  @ApiProperty({ example: 'Jane' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'jane@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'SecurePass123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'India' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: ['admin'], type: [String] })
  @IsString({ each: true })
  @IsNotEmpty()
  role: string[];

  @ApiProperty({ example: 'TechCorp', required: false })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiProperty({ example: '123456789RT0001', required: false })
  @IsOptional()
  @IsString()
  hstNumber?: string;
}
