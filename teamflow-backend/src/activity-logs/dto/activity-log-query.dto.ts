import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class ActivityLogQueryDto extends PaginationQueryDto {

    @ApiPropertyOptional({
        example: 'TASK_CREATED',
        description: 'Filter activity logs by action.',
    })
    @IsOptional()
    @IsString()
    action?: string;

    @ApiPropertyOptional({
        example: 'TASK',
        description: 'Filter activity logs by entity type.',
    })
    @IsOptional()
    @IsString()
    entityType?: string;

    @ApiPropertyOptional({
        example: 'b18a45fb-9a9a-4d90-abaf-a9099a8e31c2',
        description: 'Filter activity logs by user ID.',
    })
    @IsOptional()
    @IsString()
    userId?: string;
}