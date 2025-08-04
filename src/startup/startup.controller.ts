// src/startup/startup.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { StartupService } from './startup.service';
import { CreateStartupDto } from './dto/create-startup.dto';
import { Public } from 'src/user/public.decorator';

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

  @Get('applications')
  @Public()
  async getAllApplications() {
    const applications = await this.startupService.getAll();
    return {
      message: 'All startup applications fetched successfully',
      data: applications,
    };
  }
}
