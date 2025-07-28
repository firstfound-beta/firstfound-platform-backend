import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { IUser } from '../interfaces/user.interface';
export class CreateUserDto implements Partial<IUser> {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString({ each: true })
  @IsNotEmpty()
  role: string[];

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  hstNumber?: string;
}
