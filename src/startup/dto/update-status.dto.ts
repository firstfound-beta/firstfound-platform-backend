// src/startup/dto/update-status.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({
    description: 'Status of the startup',
    example: 'approved',
    enum: ['pending', 'approved', 'rejected'],
  })
  @IsString()
  @IsIn(['pending', 'approved', 'rejected'])
  status: string;
}
