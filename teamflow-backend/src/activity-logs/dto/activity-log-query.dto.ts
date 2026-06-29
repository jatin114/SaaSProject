import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class ActivityLogQueryDto extends PaginationQueryDto {

    @IsOptional()
    @IsString()
    action?: string;

    @IsOptional()
    @IsString()
    entityType?: string;

    @IsOptional()
    @IsString()
    userId?: string;
}