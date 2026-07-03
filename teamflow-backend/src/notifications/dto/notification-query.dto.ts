import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationType } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class NotificationQueryDto extends PaginationQueryDto {

    @ApiPropertyOptional({
        enum: NotificationType,
        example: NotificationType.TASK_ASSIGNED,
        description: 'Filter notifications by type.',
    })
    @IsOptional()
    @IsEnum(NotificationType)
    type?: NotificationType;

    @ApiPropertyOptional({
        example: false,
        description: 'Filter notifications by read status.',
    })
    @IsOptional()
    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    isRead?: boolean;
}