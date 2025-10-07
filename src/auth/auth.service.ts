import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import to from 'await-to-js';
import { CreateUserDto } from '../user/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const [userErr, user] = await to(
      this.userModel.findOne({ email }).lean().exec(),
    );

    const [isMatchErr, isMatch] = await to(
      bcrypt.compare(password, user.password),
    );

    if (isMatchErr || !isMatch)
      throw new UnauthorizedException('Invalid password');
    console.log(user);
    const userData = {
      id: user._id.toString(),
      displayName: user.fullName,
      email: user.email,
    };

    const token = this.createToken(user);

    return { token, user: userData };
  }

  private createToken(user: User) {
    const payload = {
      id: user._id,
      email: user.email,
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.EXPIRES_IN || '24h',
    });
  }

  async register(createUserDto: CreateUserDto) {
    const { fullName, email, password, confirmPassword } = createUserDto;

    // Check if the user already exists
    const [existingUserErr, existingUser] = await to(
      this.userModel.findOne({ email }).exec(),
    );
    if (existingUserErr || existingUser) {
      throw new ForbiddenException('User already exists');
    }

    const userData: any = {
      fullName,
      email,
      password,
      confirmPassword,
    };

    userData.password = password; // Let the pre-save hook handle hashing
    console.log('userData', userData);
    const [saveErr, newUser] = await to(new this.userModel(userData).save());
    if (saveErr) {
      console.error('Error during user save:', saveErr);
      throw new ForbiddenException('Error creating user: ' + saveErr.message);
    }
    console.log('newUser', newUser);
    return newUser;
  }

  async resetPassword(email: string, newPassword: string): Promise<boolean> {
    if (!email || !newPassword) {
      throw new ForbiddenException('Email and new password are required');
    }

    const [userErr, user] = await to(this.userModel.findOne({ email }).exec());
    if (userErr || !user) throw new UnauthorizedException('User not found');

    const [hashErr, hashedPassword] = await to(bcrypt.hash(newPassword, 10));
    if (hashErr) throw new ForbiddenException('Error hashing password');
    console.log('hashedPassword', hashedPassword);
    user.password = hashedPassword as string;

    const [saveErr] = await to(user.save());
    if (saveErr) throw new ForbiddenException('Error saving new password');
    return true;
  }
}
