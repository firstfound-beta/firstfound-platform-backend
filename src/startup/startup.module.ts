// src/startup/startup.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Startup, StartupSchema } from './schemas/startup.schema';
import { StartupService } from './startup.service';
import { StartupController } from './startup.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Startup.name, schema: StartupSchema }]),
  ],
  controllers: [StartupController],
  providers: [StartupService],
})
export class StartupModule {}
