// src/startup/startup.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Startup, StartupDocument } from './schemas/startup.schema';
import { CreateStartupDto } from './dto/create-startup.dto';

@Injectable()
export class StartupService {
  constructor(
    @InjectModel(Startup.name) private startupModel: Model<StartupDocument>,
  ) {}

  async apply(createStartupDto: CreateStartupDto): Promise<Startup> {
    const startup = new this.startupModel(createStartupDto);
    return startup.save();
  }
}
