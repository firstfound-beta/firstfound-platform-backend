// src/startup/startup.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StartupService } from './startup.service';
import { CreateStartupDto } from './dto/create-startup.dto';
import { Public } from 'src/user/public.decorator';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { LoginStartupDto } from './dto/login-startup.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
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
  @ApiBody({ type: UpdateStatusDto })
  async updateStatus(@Param('id') id: string, @Body() body: UpdateStatusDto) {
    const updated = await this.startupService.updateStatus(id, body.status);
    return {
      message: `Startup status updated to '${body.status}' successfully`,
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

  @Get(':id')
  @ApiOperation({ summary: 'Get a startup by ID' })
  @ApiParam({ name: 'id', description: 'Startup ID to fetch' })
  async getStartupById(@Param('id') id: string) {
    const startup = await this.startupService.getById(id);
    return {
      message: 'Startup fetched successfully',
      data: startup,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a startup application by ID' })
  @ApiParam({ name: 'id', description: 'Startup ID to delete' })
  async deleteStartup(@Param('id') id: string) {
    await this.startupService.delete(id);
    return {
      message: 'Startup application deleted successfully',
    };
  }
}
