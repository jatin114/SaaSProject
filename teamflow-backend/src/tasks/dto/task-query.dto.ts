import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskPriority, TaskStatus } from '@prisma/client';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class TaskQueryDto extends PaginationQueryDto {

    @IsOptional()
    @IsString()
    projectId?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;

    @IsOptional()
    @IsString()
    assignedUserId?: string;
}