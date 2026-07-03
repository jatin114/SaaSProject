import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskPriority } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {

    @ApiProperty({
        example: 'Implement JWT Authentication',
        description: 'Title of the task.',
    })
    @IsString()
    title: string;

    @ApiPropertyOptional({
        example: 'Implement login, refresh token and role-based authorization.',
        description: 'Detailed description of the task.',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        example: '6d78e53d-5f12-4d8a-b0b8-6ab18d0ef5e8',
        description: 'Project ID to which this task belongs.',
    })
    @IsString()
    projectId: string;

    @ApiPropertyOptional({
        example: '2f6dbb12-59c6-4b46-9a1d-8f4d88cb7c95',
        description: 'User ID of the assigned team member.',
    })
    @IsOptional()
    @IsString()
    assignedUserId?: string;

    @ApiPropertyOptional({
        enum: TaskPriority,
        example: TaskPriority.HIGH,
        description: 'Priority of the task.',
    })
    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;
}