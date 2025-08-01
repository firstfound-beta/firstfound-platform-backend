// src/startup/startup.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { StartupService } from './startup.service';
import { CreateStartupDto } from './dto/create-startup.dto';

@Controller('startup')
export class StartupController {
  constructor(private readonly startupService: StartupService) {}

  @Post('apply')
  async apply(@Body() createStartupDto: CreateStartupDto) {
    const result = await this.startupService.apply(createStartupDto);
    return {
      message: 'Application submitted successfully',
      data: result,
    };
  }
}
