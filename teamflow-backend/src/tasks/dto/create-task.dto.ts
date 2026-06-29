import { IsString, IsOptional, IsEnum } from 'class-validator';
import { TaskPriority } from '@prisma/client';

export class CreateTaskDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    projectId: string;

    @IsOptional()
    @IsString()
    assignedUserId?: string;

    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;
}