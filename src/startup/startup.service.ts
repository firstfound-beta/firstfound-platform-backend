// src/startup/startup.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Startup, StartupDocument } from './schemas/startup.schema';
import { CreateStartupDto } from './dto/create-startup.dto';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { LoginStartupDto } from './dto/login-startup.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class StartupService {
  constructor(
    @InjectModel(Startup.name) private startupModel: Model<StartupDocument>,
    private jwtService: JwtService,
  ) {}

  async apply(createStartupDto: CreateStartupDto): Promise<Startup> {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(createStartupDto.password, 10);

    const startup = new this.startupModel({
      ...createStartupDto,
      password: hashedPassword,
      confirmPassword: hashedPassword, // optional, for consistency
    });

    return startup.save();
  }

  async login(loginStartupDto: LoginStartupDto) {
    const { founderEmail, password } = loginStartupDto;

    const startup = await this.startupModel.findOne({ founderEmail });
    if (!startup) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, startup.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (startup.status !== 'approved') {
      throw new BadRequestException(
        'Your account is not approved yet. Please wait for admin approval.',
      );
    }

    const payload = {
      id: startup._id,
      email: startup.founderEmail,
      companyName: startup.companyName,
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
    });

    return {
      message: 'Login successful',
      token,
      startup: {
        id: startup._id,
        companyName: startup.companyName,
        founderEmail: startup.founderEmail,
      },
    };
  }

  async getAll() {
    return this.startupModel.find().exec();
  }
  async updateStatus(id: string, status: string): Promise<Startup> {
    const updatedStartup = await this.startupModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedStartup) {
      throw new Error('Startup not found');
    }

    return updatedStartup;
  }
}
