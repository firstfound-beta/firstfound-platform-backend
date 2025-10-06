// src/startup/startup.controller.ts
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { StartupService } from './startup.service';
import { CreateStartupDto } from './dto/create-startup.dto';
import { Public } from 'src/user/public.decorator';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { LoginStartupDto } from './dto/login-startup.dto';
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

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update startup application status' })
  @ApiParam({ name: 'id', description: 'Startup ID to update' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'approved',
          enum: ['pending', 'approved', 'rejected'],
        },
      },
    },
  })
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return { message: 'Invalid status value' };
    }

    const updated = await this.startupService.updateStatus(id, status);
    return {
      message: `Startup status updated to '${status}' successfully`,
      data: updated,
    };
  }

  // ✅ New: Login route
  @Post('login')
  @ApiOperation({ summary: 'Login for approved startups' })
  @ApiBody({ type: LoginStartupDto })
  async login(@Body() loginStartupDto: LoginStartupDto) {
    return this.startupService.login(loginStartupDto);
  }
}
