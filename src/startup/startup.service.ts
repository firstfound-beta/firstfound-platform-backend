// src/startup/startup.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Startup, StartupDocument } from './schemas/startup.schema';
import { CreateStartupDto } from './dto/create-startup.dto';
import { JwtService } from '@nestjs/jwt';
import {
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginStartupDto } from './dto/login-startup.dto';
import * as bcrypt from 'bcryptjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Injectable()
export class StartupService {
  constructor(
    @InjectModel(Startup.name) private startupModel: Model<StartupDocument>,
    private jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async apply(createStartupDto: CreateStartupDto): Promise<Startup> {
    try {
      // ✅ Check if email already exists
      const existingStartup = await this.startupModel.findOne({
        founderEmail: createStartupDto.founderEmail,
      });

      if (existingStartup) {
        throw new BadRequestException(
          'A startup with this founder email already exists. Please log in or use a different email.',
        );
      }

      // ✅ Hash password before saving
      const hashedPassword = await bcrypt.hash(createStartupDto.password, 10);

      const startup = new this.startupModel({
        ...createStartupDto,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      });

      // ✅ Emit “application received” email event
      this.eventEmitter.emit('user.application.received', {
        email: createStartupDto.founderEmail,
        name: createStartupDto.companyName,
      });

      return await startup.save();
    } catch (error) {
      // ✅ Handle MongoDB duplicate key error just in case
      if (error.code === 11000 && error.keyPattern?.founderEmail) {
        throw new BadRequestException(
          'A startup with this founder email already exists. Please log in or use a different email.',
        );
      }

      throw new InternalServerErrorException(
        'Something went wrong while submitting the application.',
      );
    }
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

    // ✅ Emit email event only when approved
    if (status === 'approved') {
      this.eventEmitter.emit('user.application.approved', {
        email: updatedStartup.founderEmail,
        name: updatedStartup.companyName,
      });
    } else if (status === 'rejected') {
      this.eventEmitter.emit('user.application.rejected', {
        email: updatedStartup.founderEmail,
        name: updatedStartup.companyName,
      });
    }

    return updatedStartup;
  }

  async getById(id: string): Promise<Startup> {
    const startup = await this.startupModel.findById(id).exec();
    if (!startup) {
      throw new BadRequestException('Startup not found');
    }
    return startup;
  }
  async delete(id: string): Promise<void> {
    const result = await this.startupModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new BadRequestException('Startup not found');
    }
  }
}
