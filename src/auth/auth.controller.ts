import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from '../user/public.decorator';
import { Response } from 'express';
import { ResetPasswordDto } from './dto/resetPassword.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    try {
      console.log(registerDto);
      const user = await this.authService.register({
        ...registerDto,
        role: registerDto.role,
      });
      console.log(user);
      return res.status(HttpStatus.CREATED).json({
        message: 'User registered successfully',
        user,
      });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { email, password } = loginDto;
    try {
      const { token, user } = await this.authService.login(email, password);
      return res.json({ token, user });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res() res: Response,
  ) {
    const { email, newPassword } = resetPasswordDto;
    try {
      if (!email || !newPassword) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Email and new password are required' });
      }

      await this.authService.resetPassword(email, newPassword);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Password has been successfully reset' });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }
}
