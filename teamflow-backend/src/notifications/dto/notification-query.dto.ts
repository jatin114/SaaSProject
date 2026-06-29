import { IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { NotificationType } from '@prisma/client';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Transform } from 'class-transformer';

export class NotificationQueryDto extends PaginationQueryDto {
    @IsOptional()
    @IsEnum(NotificationType)
    type?: NotificationType;

    @IsOptional()
    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    isRead?: boolean;
}