import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { User } from './schemas/user.schema';
import { Role } from './enums/role.enum';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createUser(@Body() createUserDto: Partial<User>, @Res() res: Response) {
    try {
      const user = await this.userService.createUser(createUserDto);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      console.error('Error creating user:', error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Could not create user',
      });
    }
  }
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<User>,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }
}
