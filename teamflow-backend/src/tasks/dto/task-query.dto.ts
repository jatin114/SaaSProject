import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class TaskQueryDto extends PaginationQueryDto {

    @ApiPropertyOptional({
        example: '6d78e53d-5f12-4d8a-b0b8-6ab18d0ef5e8',
        description: 'Filter tasks by project ID.',
    })
    @IsOptional()
    @IsString()
    projectId?: string;

    @ApiPropertyOptional({
        enum: TaskStatus,
        example: TaskStatus.TODO,
        description: 'Filter tasks by status.',
    })
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @ApiPropertyOptional({
        enum: TaskPriority,
        example: TaskPriority.HIGH,
        description: 'Filter tasks by priority.',
    })
    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;

    @ApiPropertyOptional({
        example: '2f6dbb12-59c6-4b46-9a1d-8f4d88cb7c95',
        description: 'Filter tasks assigned to a specific user.',
    })
    @IsOptional()
    @IsString()
    assignedUserId?: string;
}